// import "./App.css";
// import AudioRecorder from "./components/AudioRecorder";
// import Navigation from "./components/Navigation";
// import HomePage from "./components/HomePage";
// import Slid from "./components/Slid";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import AudioUpload from "./components/audioUpload";

// const App = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-black text-white">
//       <Navigation />

//       {/* Optional landing section */}
//       {/* <HomePage /> */}

//       <h2 className="text-center font-Roboto font-bold text-2xl mt-6">
//         Please submit your audio response to check for clinical depression
//       </h2>

//       <Slid />

//       {/* 🎙️ Recording Option */}
//       <div className="mt-8">
//         <h3 className="text-center text-xl font-semibold mb-4">🎙️ Record Your Audio</h3>
//         <AudioRecorder />
//       </div>

//       {/* 📁 Upload Option */}
//       <div className="mt-8">
//         <h3 className="text-center text-xl font-semibold mb-4">📁 Or Upload Pre-recorded Audio</h3>
//         <AudioUpload />
//       </div>
//     </div>
//   );
// };

// export default App;
import "./App.css";
import { Routes, Route } from "react-router-dom"; // ✅ updated import
import AudioRecorder from "./components/AudioRecorder";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage";
import Slid from "./components/Slid";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AudioUpload from "./components/AudioUpload";
import { Sephina } from "./components/Sephina/Sephina";
import Features from "./components/Features/Features";
import Login from "./components/Login/Login";
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const DepressionTest = () => {
  return (
    <div className="content">
      <h2 className="text-center font-bold text-2xl mt-6">
        Please submit your audio response to check for clinical depression
      </h2>
      <Slid />

      <div className="mt-8">
        <h3 className="text-center text-xl font-semibold mb-4">🎙 Record Your Audio</h3>
        <AudioRecorder />
      </div>

      <div className="mt-8">
        <h3 className="text-center text-xl font-semibold mb-4">📁 Or Upload Pre-recorded Session Audio</h3>
        <AudioUpload />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/depression-test"
            element={
              <ProtectedRoute>
                <DepressionTest />
              </ProtectedRoute>
            }
          />
          <Route path="/sephina" element={<Sephina />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
