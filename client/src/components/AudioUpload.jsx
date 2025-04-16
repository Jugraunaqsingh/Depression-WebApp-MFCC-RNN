// import { faL } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import React from "react";
// import { useState } from "react";



// const AudioUpload = (props) =>{
//     const uid=props.uid;

//     const [file,setFile]= useState("");
//     const [uploaded,setUploaded]=useState(false);

//     const onFileChange =  (event) =>{
//         // Create an object of formData
//       setFile(event.target.files[0]);
//     }

//     const onFileUpload = async (e) =>{
//         e.preventDefault();
//         const formdata = new FormData();

//         formdata.append("audioFile",file,"audio.weba");
//         formdata.append('uid',uid); 
//         const response = await axios.post('http://localhost:5000/audio', formdata , {
//             headers:{
//                 "Content-Type":"audio/webm"
//             }
//         })
         
      
//         if (response.ok) {
//           console.log(response);
//           setUploaded(true);
//         } else {
//           console.error('Error uploading audio file.');
//           console.log(response.body);
//           setUploaded(true);
//         }
//     }
    


//     return (
//         <div>
//                 <input type="file" onChange={(event)=>{setFile(event.target.files[0])}}/>
//                 <button type="submit"onClick={onFileUpload} className="text-white">
//                   Upload!
//                 </button>
//                 {uploaded?<p>FIle uploaded!</p>:null}
//     </div>

//     )
    
// }

// export default AudioUpload;

//Update 2: 


// import React, { useState } from "react";
// import axios from "axios";
// import './AudioUpload.css';
// const AudioUpload = () => {
//   const [doctorVerified, setDoctorVerified] = useState(null);
//   const [file, setFile] = useState(null);
//   const [uploaded, setUploaded] = useState(false);
//   const [result, setResult] = useState(null);
//   const [doctorLabel, setDoctorLabel] = useState(null);
//   const [phqScore, setPhqScore] = useState("");
//   const [doctorFile, setDoctorFile] = useState(null);

//   const onFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const onFileUpload = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       alert("Please select a file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file); // FastAPI expects "file"

//     try {
//       const response = await axios.post("http://localhost:8000/upload_audio", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setUploaded(true);
//       setResult(response.data); // { filename, depressed, level }
//     } catch (error) {
//       console.error("Upload failed:", error);
//       alert("Upload failed!");
//     }
//   };
//   const submitDoctorFeedback = async () => {
//     if (doctorLabel === null || phqScore === "") {
//       alert("Please fill in all required fields.");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("audio_id", result.filename); // use audio file name as ID
//     formData.append("model_prediction", JSON.stringify({
//       depressed: result.depressed,
//       level: result.level
//     }));
//     formData.append("doctor_label", JSON.stringify({
//       depressed: doctorLabel
//     }));
//     formData.append("phq_score", phqScore);
  
//     if (doctorFile) {
//       formData.append("report_file", doctorFile); // attach PDF/image if uploaded
//     }
  
//     try {
//       await axios.post("http://localhost:8000/submit_feedback", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
  
//       alert("✅ Doctor feedback submitted successfully!");
//     } catch (err) {
//       console.error("Feedback submission failed:", err);
//       alert("❌ Failed to submit feedback.");
//     }
//   };
  
//   return (
//     <div className="p-4">
//       <input type="file" accept="audio/*" onChange={onFileChange} />
//       <button
//         onClick={onFileUpload}
//         className="bg-blue-600 text-white px-4 py-2 rounded ml-2"
//       >
//         Upload!
//       </button>

//       {uploaded && result && (
//         <div className="mt-4">
//           <p className="text-green-600 font-semibold">✅ File uploaded successfully!</p>
//           <p><strong>Predicted Depression:</strong> {result.depressed ? "Yes" : "No"}</p>
//           <p><strong>PHQ-8 Level:</strong> {result.level}</p>
//           {/* NEW STEP 1: Doctor Verification Question */}
//     <div className="mt-4 bg-gray-700 p-4 rounded">
//       <p className="mb-2">🩺 Did you verify this result through a doctor?</p>
//       <div className="flex gap-4">
//         <button
//           onClick={() => setDoctorVerified(true)}
//           className="bg-green-600 px-4 py-2 rounded"
//         >
//           ✅ Yes
//         </button>
//         <button
//           onClick={() => setDoctorVerified(false)}
//           className="bg-red-600 px-4 py-2 rounded"
//         >
//           ❌ No
//         </button>
//       </div>
//     </div>
//         </div>
//       )}
//       {doctorVerified === true && (
//   <div className="mt-4 bg-gray-800 p-4 rounded">
//     <p className="mb-2 font-semibold">📋 Please enter the doctor's diagnosis:</p>

//     {/* Depression status */}
//     <div className="mb-2">
//       <label className="mr-2">Correct Depression Status:</label>
//       <select
//         onChange={(e) => setDoctorLabel(e.target.value === "true")}
//         className="text-black px-2 py-1 rounded"
//       >
//         <option value="">Select</option>
//         <option value="true">Yes</option>
//         <option value="false">No</option>
//       </select>
//     </div>

//     {/* PHQ Score */}
//     <div className="mb-2">
//       <label className="mr-2">PHQ-8 Score (0-8):</label>
//       <input
//         type="number"
//         min="0"
//         max="8"
//         value={phqScore}
//         onChange={(e) => setPhqScore(e.target.value)}
//         className="text-black px-2 py-1 rounded"
//       />
//     </div>

//     {/* Doctor file upload */}
//     <div className="mb-2">
//       <label className="mr-2">Upload doctor’s report (optional):</label>
//       <input
//         type="file"
//         onChange={(e) => setDoctorFile(e.target.files[0])}
//         accept=".pdf,.png,.jpg,.jpeg"
//         className="text-white"
//       />
//     </div>

//     {/* Submit feedback */}
//     <button
//       onClick={submitDoctorFeedback}
//       className="bg-yellow-500 px-4 py-2 rounded mt-2"
//     >
//       Submit Doctor Feedback
//     </button>
//   </div>
// )}

//     </div>
//   );
// };

// export default AudioUpload;





import React, { useState } from "react";
import axios from "axios";
import "./AudioUpload.css";

const AudioUpload = () => {
  const [doctorVerified, setDoctorVerified] = useState(null);
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [result, setResult] = useState(null);
  const [doctorLabel, setDoctorLabel] = useState(null);
  const [phqScore, setPhqScore] = useState("");
  const [doctorFile, setDoctorFile] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/upload_audio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploaded(true);
      setResult(response.data);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    }
  };

  const submitDoctorFeedback = async () => {
    if (doctorLabel === null || phqScore === "") {
      alert("Please fill in all required fields.");
      return;
    }
  
    const formData = new FormData();
    formData.append("audio_id", result.filename);
    formData.append("model_prediction", JSON.stringify({
      depressed: result.depressed,
      level: result.level
    }));
    formData.append("doctor_label", JSON.stringify({
      depressed: doctorLabel
    }));
    formData.append("phq_score", phqScore);
  
    if (doctorFile) {
      formData.append("report_file", doctorFile);
    }
  
    try {
      await axios.post("http://localhost:8000/submit_feedback", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      alert("✅ Doctor feedback submitted successfully!");
    } catch (err) {
      console.error("Feedback submission failed:", err);
      alert("❌ Failed to submit feedback.");
    }
  };

  return (
    <div className="audio-upload-container">
      <div className="upload-section">
        <h2>Upload Audio File</h2>
        <div className="file-input-container">
          <input
            type="file"
            accept="audio/*"
            onChange={onFileChange}
            className="file-input"
          />
          <button onClick={onFileUpload} className="upload-button">
            Upload
          </button>
        </div>
      </div>

      {uploaded && result && (
        <div className="result-section">
          <div className="result-card">
            <h3>Upload Successful!</h3>
            <div className="result-details">
              <p><span>Predicted Depression:</span> {result.depressed ? "Yes" : "No"}</p>
              <p><span>PHQ-8 Level:</span> {result.level}</p>
            </div>

            <div className="doctor-verification">
              <h4>Doctor Verification</h4>
              <p>Did you verify this result through a doctor?</p>
              <div className="verification-buttons">
                <button
                  onClick={() => setDoctorVerified(true)}
                  className="verify-button yes"
                >
                  Yes
                </button>
                <button
                  onClick={() => setDoctorVerified(false)}
                  className="verify-button no"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {doctorVerified === true && (
        <div className="doctor-feedback-section">
          <div className="feedback-form">
            <h3>Doctor's Diagnosis</h3>
            
            <div className="form-group">
              <label>Correct Depression Status:</label>
              <select
                onChange={(e) => setDoctorLabel(e.target.value === "true")}
                className="form-select"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="form-group">
              <label>PHQ-8 Score (0-8):</label>
              <input
                type="number"
                min="0"
                max="8"
                value={phqScore}
                onChange={(e) => setPhqScore(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Upload doctor's report (optional):</label>
              <input
                type="file"
                onChange={(e) => setDoctorFile(e.target.files[0])}
                accept=".pdf,.png,.jpg,.jpeg"
                className="file-input"
              />
            </div>

            <button
              onClick={submitDoctorFeedback}
              className="submit-feedback-button"
            >
              Submit Doctor Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioUpload;
