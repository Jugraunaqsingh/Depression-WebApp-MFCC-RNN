from pymongo import MongoClient
from dotenv import load_dotenv
import os
# Use 'host.docker.internal' to connect to host machine's MongoDB from inside Docker
load_dotenv()
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri) # change if you're using Atlas
db = client["depression_app"]
collection = db["feedback"]

def save_feedback(audio_id, mfcc_path, model_prediction, doctor_label, phq_score=None):
    """
    Store doctor feedback for an audio file with model prediction and optional PHQ-9 score.
    """
    feedback_doc = {
        "audio_id": audio_id,
        "mfcc_path": mfcc_path,
        "model_prediction": model_prediction,
        "doctor_label": doctor_label,
        "phq_score": phq_score
    }
    collection.insert_one(feedback_doc)
    print(f"✅ Feedback saved for {audio_id}")

def get_feedback_data():
    """
    Get feedback entries with labels and MFCCs that haven't been used yet.
    """
    return list(collection.find({
        "doctor_label": {"$exists": True},
        "mfcc_path": {"$exists": True},
        "used": {"$ne": True}
    }))

def mark_feedback_as_used(entry_ids):
    """
    Mark a list of feedback entries as used so they are not reused in training.
    """
    for _id in entry_ids:
        collection.update_one({"_id": _id}, {"$set": {"used": True}})
