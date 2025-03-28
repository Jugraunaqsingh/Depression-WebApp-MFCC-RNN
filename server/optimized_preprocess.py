import numpy as np
import librosa
import scipy.fftpack
from pydub import effects
from concurrent.futures import ThreadPoolExecutor
import cupy as cp

# ========== MFCC PREPROCESS ==========

def MFCC_Preprocess(audio):
    normalized_audio = effects.normalize(audio)
    fs = audio.frame_rate
    data = audio.get_array_of_samples()

    window_length = 2.5  # seconds
    step_size = 0.5      # seconds
    window_samples = int(window_length * fs)
    step_samples = int(step_size * fs)

    print(len(data), " ", len(data) / step_samples)

    # Define Mel and cepstral dimensions
    n_mels = 24
    n_ceps = 60

    start_idx = 0
    end_idx = window_samples
    feature_vectors = []

    with ThreadPoolExecutor() as executor:
        futures = []
        while end_idx <= len(data):
            segment = data[start_idx:end_idx]
            segment = cp.array(segment)
            futures.append(
                executor.submit(feature_extraction_kernel, segment, window_samples, fs, n_mels, n_ceps)
            )
            start_idx += step_samples
            end_idx += step_samples

        for future in futures:
            feature_vectors.append(future.result())

    feature_vectors = cp.vstack(feature_vectors)

    # Standardize (mean normalization)
    mean = cp.mean(feature_vectors, axis=0)
    std = cp.std(feature_vectors, axis=0)
    feature_vectors = (feature_vectors - mean) / std

    return cp.asnumpy(feature_vectors)

# ========== FEATURE EXTRACTION ==========

def feature_extraction_kernel(segment, window_samples, fs, n_mels, n_ceps):
    # Apply windowing
    window = cp.hanning(window_samples)
    windowed_segment = segment * window

    # FFT → log magnitude spectrum
    dft = cp.fft.rfft(windowed_segment)
    dft_magnitude = cp.log(cp.abs(dft))
    dft_magnitude[cp.isnan(dft_magnitude)] = 0
    dft_magnitude[cp.isinf(dft_magnitude)] = 0

    # Harmonic filtering for better frequency emphasis
    fft_magnitude = cp.asarray(librosa.effects.harmonic(cp.asnumpy(dft_magnitude)))

    # ✅ FIX: Use keyword arguments for compatibility
    mel_filter = cp.asarray(librosa.filters.mel(sr=fs, n_fft=window_samples, n_mels=n_mels))
    mel_spectrum = cp.dot(mel_filter, fft_magnitude)
    smoothed_spectrum = cp.log(mel_spectrum)

    # KL transform via DCT
    kl_transform = cp.asarray(
        scipy.fftpack.dct(cp.asnumpy(mel_spectrum), axis=0, norm='ortho')
    )

    # Cepstral Coefficients
    cosine_matrix = cp.cos(
        cp.pi * cp.arange(n_mels) * cp.arange(n_ceps).reshape(-1, 1) / n_mels
    )
    cepstral_coefficients = cp.dot(cosine_matrix, kl_transform)

    return cepstral_coefficients
