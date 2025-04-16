# Use NVIDIA CUDA base image with Python 3.9
# FROM nvidia/cuda:11.7.1-cudnn8-runtime-ubuntu20.04

# # Set working directory
# WORKDIR /app

# # System dependencies
# RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# # Copy server files
# # COPY ./server /app
# COPY server/main.py main.py
# COPY server/model.json model.json
# COPY server/mod.h5 mod.h5
# COPY server/optimized_preprocess.py optimized_preprocess.py
# # Install Python + dependencies
# COPY requirements.txt .
# RUN apt-get update && apt-get install -y python3-pip
# RUN pip3 install --upgrade pip
# RUN pip3 install -r requirements.txt
# RUN pip install python-dotenv


# # Default FastAPI command
# # CMD ["uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "5000"]
# # CMD ["python3", "evaluate_batch.py"]

# # CMD ["uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "8000"]
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

FROM nvidia/cuda:11.7.1-cudnn8-runtime-ubuntu20.04

WORKDIR /app

RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y python3-pip
RUN pip3 install --upgrade pip

COPY requirements.txt .
RUN pip3 install -r requirements.txt
RUN pip install python-dotenv

# Copy FastAPI app + logic
COPY server/main.py main.py
COPY server/db_feedback.py db_feedback.py
COPY server/model.json model.json
COPY server/mod.h5 mod.h5
COPY server/optimized_preprocess.py optimized_preprocess.py
# Copy auth routes
COPY server/auth_routes.py auth_routes.py

# Optional: add retraining script
COPY server/retrain_from_feedback.py retrain_from_feedback.py

# Optional: pre-create folders in container
RUN mkdir -p uploads mfccs weights

# Launch FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
