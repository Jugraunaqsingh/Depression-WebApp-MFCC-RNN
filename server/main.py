from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydub import AudioSegment, effects
from optimized_preprocess import MFCC_Preprocess
from keras.models import model_from_json
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
import os
#CHANGES MADE FOR FEEDBACK LOOP
from fastapi import Form
from db_feedback import save_feedback
import json


app = FastAPI()

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once
print("📦 Loading model...")
# with open("server/model.json", "r") as f:
with open("model.json", "r") as f:

    model = model_from_json(f.read())

# model.load_weights("server/mod.h5")
model.load_weights("mod.h5")

model.compile(
    optimizer=tf.keras.optimizers.legacy.Adam(learning_rate=0.0015, decay=1e-6),
    loss=['binary_crossentropy', 'sparse_categorical_crossentropy'],
    metrics=['accuracy']
)
print("✅ Model loaded.")

# Ensure upload path exists
# os.makedirs("server/uploads", exist_ok=True)

os.makedirs("uploads", exist_ok=True)


@app.post("/upload_audio")
async def upload_audio(file: UploadFile = File(...)):
    try:
        # Save uploaded file
        file_path = f"uploads/{file.filename}"
        with open(file_path, "wb") as f:
            f.write(await file.read())

        print(f"🎙️ Received file: {file.filename}")

        # Process and predict
        audio = AudioSegment.from_file(file_path)
        audio = effects.normalize(audio)
        mfcc = MFCC_Preprocess(audio)

        #SAVING THE MFCCS FOR RETRAINING
        os.makedirs("mfccs", exist_ok=True)
        mfcc_save_path = f"mfccs/{file.filename.replace('.wav', '.npy')}"
        np.save(mfcc_save_path, mfcc)


        input_tensor = pad_sequences([mfcc], padding="pre")

        pred_binary, pred_scores = model.predict(input_tensor, verbose=0)
        depression = int(pred_binary[0][0] > 0.5)
        level = int(np.argmax(pred_scores[0]))

        print(f"🔍 Prediction - Depressed: {depression}, Level: {level}")

        return {
            "success": True,
            "filename": file.filename,
            "depressed": depression,
            "level": level
        }

    except Exception as e:
        print(f"❌ Error: {e}")
        return {"success": False, "error": str(e)}



@app.post("/submit_feedback")
async def submit_feedback(
    audio_id: str = Form(...),
    model_prediction: str = Form(...),
    doctor_label: str = Form(...),
    phq_score: str = Form(...),
    report_file: UploadFile = File(None)  # optional
):
    try:
        # Parse stringified JSON inputs
        model_pred = json.loads(model_prediction)
        doctor_lbl = json.loads(doctor_label)

        # Construct MFCC path (adjust if you store them elsewhere)
        mfcc_path = f"mfccs/{audio_id.replace('.wav', '.npy')}"

        # Save feedback using helper function
        save_feedback(
            audio_id=audio_id,
            mfcc_path=mfcc_path,
            model_prediction=model_pred,
            doctor_label=doctor_lbl,
            phq_score=int(phq_score)
        )

        return {"status": "success"}

    except Exception as e:
        print(f"❌ Error saving feedback: {e}")
        return {"status": "error", "detail": str(e)}
# ... existing routes like /upload_audio, /submit_feedback, etc.

from auth_routes import router as auth_router
app.include_router(auth_router)
