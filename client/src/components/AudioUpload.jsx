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



import React, { useState } from "react";
import axios from "axios";

const AudioUpload = () => {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [result, setResult] = useState(null);

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
    formData.append("file", file); // FastAPI expects "file"

    try {
      const response = await axios.post("http://localhost:8000/upload_audio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploaded(true);
      setResult(response.data); // { filename, depressed, level }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="p-4">
      <input type="file" accept="audio/*" onChange={onFileChange} />
      <button
        onClick={onFileUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded ml-2"
      >
        Upload!
      </button>

      {uploaded && result && (
        <div className="mt-4">
          <p className="text-green-600 font-semibold">✅ File uploaded successfully!</p>
          <p><strong>Predicted Depression:</strong> {result.depressed ? "Yes" : "No"}</p>
          <p><strong>PHQ-8 Level:</strong> {result.level}</p>
        </div>
      )}
    </div>
  );
};

export default AudioUpload;
