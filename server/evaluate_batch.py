import os
import pandas as pd
import numpy as np
from pydub import AudioSegment
import tensorflow as tf
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, confusion_matrix, ConfusionMatrixDisplay
from optimized_preprocess import MFCC_Preprocess
from keras.models import model_from_json
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Paths
AUDIO_DIR = "server/uploads"
TRANSCRIPT_DIR = "server/transcripts"

LABEL_PATH = "server/labels/test_split.csv"

RESULT_PATH = "server/results/predictions.csv"
PLOT_DIR = "server/results/evaluation_plots"
MODEL_JSON = "server/model.json"
MODEL_WEIGHTS = "server/mod.h5"

os.makedirs("results", exist_ok=True)
os.makedirs(PLOT_DIR, exist_ok=True)

# Load labels
df_labels = pd.read_csv(LABEL_PATH).set_index("Participant_ID")

# Load model
with open(MODEL_JSON, 'r') as f:
    model = model_from_json(f.read())
model.load_weights(MODEL_WEIGHTS)
model.compile(
    optimizer=tf.keras.optimizers.legacy.Adam(learning_rate=0.0015, decay=1e-6),
    loss=['binary_crossentropy', 'sparse_categorical_crossentropy'],
    metrics=['accuracy']
)

results = []

def extract_participant_audio(pid):
    audio_path = os.path.join(AUDIO_DIR, f"{pid}_AUDIO.wav")
    transcript_path = os.path.join(TRANSCRIPT_DIR, f"{pid}_TRANSCRIPT.csv")

    audio = AudioSegment.from_file(audio_path)
    transcript = pd.read_csv(transcript_path, delimiter="\t")

    section = AudioSegment.empty()
    for _, row in transcript.iterrows():
        if row['speaker'] == 'Participant':
            section += audio[int(row['start_time'] * 1000):int(row['stop_time'] * 1000)]
    return section

# Loop through all participants
for pid in df_labels.index:
    try:
        print(f"Processing Participant {pid}...")
        section = extract_participant_audio(pid)
        mfcc = MFCC_Preprocess(section)
        X = pad_sequences([mfcc], padding='pre')

        pred_binary, pred_scores = model.predict(X, verbose=0)
        pred_binary = int(pred_binary[0][0] > 0.5)
        pred_score = int(np.argmax(pred_scores[0]))

        true_binary = df_labels.loc[pid, 'PHQ_Binary']
        true_score = df_labels.loc[pid, 'PHQ_Score']

        results.append({
            'Participant_ID': pid,
            'True_Binary': true_binary,
            'Pred_Binary': pred_binary,
            'True_Score': true_score,
            'Pred_Score': pred_score,
            'Score_Error': abs(pred_score - true_score)
        })

    except Exception as e:
        print(f"Error with participant {pid}: {e}")

# Save results
df_results = pd.DataFrame(results)
df_results.to_csv(RESULT_PATH, index=False)

# --- Plotting ---
# 1. Binary Classification Accuracy
acc = accuracy_score(df_results['True_Binary'], df_results['Pred_Binary'])
with open("results/accuracy_summary.txt", "w") as f:
    f.write(f"Binary Accuracy: {acc:.2f}\n")
print(f"Binary Accuracy: {acc:.2f}")

# 2. Confusion Matrix
cm = confusion_matrix(df_results['True_Binary'], df_results['Pred_Binary'])
disp = ConfusionMatrixDisplay(confusion_matrix=cm)
disp.plot()
plt.title("Binary Classification Confusion Matrix")
plt.savefig(os.path.join(PLOT_DIR, "confusion_matrix.png"))
plt.close()

# 3. Score Error Histogram
plt.hist(df_results['Score_Error'], bins=5, edgecolor='black')
plt.title("Prediction Score Error Distribution")
plt.xlabel("|Predicted - Actual| Score")
plt.ylabel("Frequency")
plt.savefig(os.path.join(PLOT_DIR, "score_error_histogram.png"))
plt.close()

print("\n✅ Evaluation complete. Check the 'results/' folder for outputs.")
