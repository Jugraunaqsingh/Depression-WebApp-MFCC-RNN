import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import model_from_json
from db_feedback import get_feedback_data, mark_feedback_as_used
import tensorflow as tf
import os

# === STEP 1: Load feedback entries from MongoDB ===
print("📥 Fetching feedback from MongoDB...")
feedback_entries = get_feedback_data()

if not feedback_entries:
    print("⚠️ No new feedback entries available for retraining.")
    exit()

X = []
y_binary = []
y_phq = []
entry_ids = []

# === STEP 2: Load MFCCs and labels ===
for entry in feedback_entries:
    try:
        mfcc = np.load(entry['mfcc_path'])
        X.append(mfcc)
        y_binary.append(int(entry['doctor_label']['depressed']))
        y_phq.append(entry['phq_score'])
        entry_ids.append(entry['_id'])
    except Exception as e:
        print(f"⚠️ Skipping entry {entry['audio_id']}: {e}")

# === STEP 3: Preprocess input ===
X_padded = pad_sequences(X, padding="pre")
y_binary = np.array(y_binary)
y_phq = np.array(y_phq)

# === STEP 4: Load model ===
print("🔁 Loading existing model...")
with open("model.json", "r") as f:
    model = model_from_json(f.read())

model.load_weights("mod.h5")

model.compile(
    optimizer=tf.keras.optimizers.legacy.Adam(learning_rate=0.0015, decay=1e-6),
    loss=['binary_crossentropy', 'sparse_categorical_crossentropy'],
    metrics=['accuracy']
)

# === STEP 5: Retrain ===
print("🚀 Retraining model on feedback data...")
model.fit(X_padded, [y_binary, y_phq], epochs=5, batch_size=8)

# === STEP 6: Save updated weights ===
os.makedirs("weights", exist_ok=True)
model.save_weights("weights/mod_retrained.h5")
print("✅ Retrained model saved as weights/mod_retrained.h5")

# === STEP 7: Mark feedback entries as used ===
mark_feedback_as_used(entry_ids)
print("🗂️ Feedback entries marked as used.")
