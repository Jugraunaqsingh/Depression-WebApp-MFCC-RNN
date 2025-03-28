import "./App.css";
import AudioRecorder from "./components/AudioRecorder";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import Slid from "./components/Slid";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AudioUpload from "./components/audioUpload";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navigation />

      {/* Optional landing section */}
      {/* <HomePage /> */}

      <h2 className="text-center font-Roboto font-bold text-2xl mt-6">
        Please submit your audio response to check for clinical depression
      </h2>

      <Slid />

      {/* 🎙️ Recording Option */}
      <div className="mt-8">
        <h3 className="text-center text-xl font-semibold mb-4">🎙️ Record Your Audio</h3>
        <AudioRecorder />
      </div>

      {/* 📁 Upload Option */}
      <div className="mt-8">
        <h3 className="text-center text-xl font-semibold mb-4">📁 Or Upload Pre-recorded Audio</h3>
        <AudioUpload />
      </div>
    </div>
  );
};

export default App;
