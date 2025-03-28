import { useState, useRef } from "react";
import axios from "axios";

const AudioRecorder = () => {
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);
  const [result, setResult] = useState(null);
  const mimeType = "audio/webm";

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = () => {
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { type: mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();

    const localChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        localChunks.push(event.data);
      }
    };
    setAudioChunks(localChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
      sendAudio(audioBlob);
    };
  };

  const sendAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "recorded_audio.webm");

    try {
      const response = await axios.post("http://localhost:8000/upload_audio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
    } catch (err) {
      console.error("Failed to upload:", err);
      alert("Upload failed!");
    }
  };

  return (
    <div className="p-6 text-white font-Roboto">
      <h2 className="text-3xl font-bold mb-4">🎙️ Audio Recorder</h2>

      {!permission ? (
        <button onClick={getMicrophonePermission} className="border px-4 py-2 rounded mb-4">
          Get Microphone
        </button>
      ) : null}

      {permission && recordingStatus === "inactive" && (
        <button onClick={startRecording} className="border px-4 py-2 rounded mr-2">
          Record
        </button>
      )}

      {permission && recordingStatus === "recording" && (
        <button onClick={stopRecording} className="border px-4 py-2 rounded">
          Stop
        </button>
      )}

      {audio && (
        <div className="mt-4">
          <audio src={audio} controls className="mb-2" />
          <a href={audio} download className="text-blue-400 underline">
            Download Recording
          </a>
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow">
          <h3 className="text-xl font-semibold">🧠 Prediction Result</h3>
          <p><strong>Depression:</strong> {result.depressed ? "Yes" : "No"}</p>
          <p><strong>PHQ-8 Score:</strong> {result.level}</p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
