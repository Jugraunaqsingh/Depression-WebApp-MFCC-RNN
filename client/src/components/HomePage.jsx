// import React from 'react'

// const HomePage = () => {
//   return (
//     <main className="flex-grow" >
//         <article className=' grid h-full grid-cols-main grid-rows-main'>
//         <div className=' flex h-full border-l border-white/10 bg-imagesection bg-cover bg-center bg-no-repeat'>
//         </div>
//         <div className=' h-full border-l border-white/10'></div>
//         <div className=' h-full border-t  border-white/10'></div>
//         <div className=' h-full border-l border-t border-white/10'></div>
//         </article>
       
//     </main>
// )}

// export default HomePage


import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import video from "../assets/video.mp4";
import client1 from "../assets/client1.jpg";
import client2 from "../assets/client2.jpg";
import client3 from "../assets/client3.jpg";

const HomePage = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVideoLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="content w-full">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-[100vh] w-full flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0 w-full h-full">
          {isVideoLoaded && (
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              src={video}
              type="video/mp4"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="z-10 px-4">
          <h1 className="text-5xl font-bold mb-6 text-white">
            AI-Powered Depression Detection
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white">
            Using advanced machine learning and audio analysis to help identify signs of clinical depression.
            Get professional assistance and support when you need it most.
          </p>
          <Link
            to="/depression-test"
            className="inline-flex items-center px-6 py-3 bg-[#8ec4d3] text-[#0e6983] rounded-[20px] hover:bg-[#0e6983] hover:text-white transition-colors"
          >
            Take Depression Test
            <ArrowUpRight className="ml-2" size={24} />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#0e6983]">How It Works</h2>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card group hover:shadow-xl transition-shadow duration-300">
              <div className="bg-[#0e6983] w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">🎙 Voice Analysis</h3>
              <p className="text-gray-600 mb-4">Record or upload your voice sample for our AI to analyze speech patterns and vocal biomarkers.</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#0e6983]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Speech pattern analysis
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#0e6983]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Vocal biomarker detection
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#0e6983]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Emotional tone assessment
                </li>
              </ul>
            </div>
            <div className="card group hover:shadow-xl transition-shadow duration-300">
              <div className="bg-[#0e6983] w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">🤖 AI Processing</h3>
              <p className="text-gray-600 mb-4">Our advanced algorithms process your audio using MFCC and RNN technology for accurate analysis.</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#0e6983]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  MFCC feature extraction
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#0e6983]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Deep learning analysis
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#0e6983]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Pattern recognition
                </li>
              </ul>
            </div>
            <div className="card group hover:shadow-xl transition-shadow duration-300">
              <div className="bg-[#0e6983] w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">📊 Results & Support</h3>
              <p className="text-gray-600 mb-4">Receive instant feedback and connect with mental health professionals if needed.</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#0e6983]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Detailed analysis report
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#0e6983]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Professional recommendations
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#0e6983]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Mental health resources
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-[#f8f9fa]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#0e6983]">About Our Technology</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-[#0e6983]">Advanced AI Technology</h3>
                <p className="text-gray-600 mb-4">
                  Our system combines state-of-the-art Machine Learning with Mel-frequency cepstral coefficients (MFCC) 
                  and Recurrent Neural Networks (RNN) to analyze vocal patterns that may indicate clinical depression.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0e6983]/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#0e6983] mb-2">Accuracy Rate</h4>
                    <p className="text-3xl font-bold text-[#0e6983]">92%</p>
                    <p className="text-sm text-gray-500">Based on clinical studies</p>
                  </div>
                  <div className="bg-[#0e6983]/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#0e6983] mb-2">Processing Time</h4>
                    <p className="text-3xl font-bold text-[#0e6983]">Under 30s</p>
                    <p className="text-sm text-gray-500">For complete analysis</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-[#0e6983]">Privacy & Security</h3>
                <p className="text-gray-600">
                  Your data is processed securely and never shared without your consent. We use end-to-end encryption 
                  and follow strict data protection protocols.
                </p>
                <div className="mt-4 flex items-center space-x-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#0e6983]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2 text-sm text-gray-600">End-to-end encryption</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#0e6983]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2 text-sm text-gray-600">Secure data storage</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-6 text-[#0e6983]">Technology Stack</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">MFCC Analysis</span>
                  <div className="w-48 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#0e6983] h-2.5 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">RNN Processing</span>
                  <div className="w-48 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#0e6983] h-2.5 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Voice Pattern Recognition</span>
                  <div className="w-48 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#0e6983] h-2.5 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Emotional Analysis</span>
                  <div className="w-48 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#0e6983] h-2.5 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-[#f8f9fa]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0e6983]">What Our Users Say</h2>
          <div className="flex justify-between">
            <div className="w-[32%] bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-[200px]">
                <img 
                  src={client1}
                  alt="Alex M." 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-[#0e6983]">Alex M.</h3>
                <p className="text-sm text-gray-500 mb-4">Student</p>
                <p className="text-gray-700 text-sm">"This platform helped me understand my mental state better. The voice analysis was surprisingly accurate and the results were very insightful."</p>
              </div>
            </div>
            
            <div className="w-[32%] bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-[200px]">
                <img 
                  src={client2}
                  alt="Sarah K." 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-[#0e6983]">Sarah K.</h3>
                <p className="text-sm text-gray-500 mb-4">Working Professional</p>
                <p className="text-gray-700 text-sm">"I was skeptical at first, but the AI analysis was spot-on. It encouraged me to seek professional help, and I'm grateful for that push."</p>
              </div>
            </div>
            
            <div className="w-[32%] bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-[200px]">
                <img 
                  src={client3}
                  alt="James R." 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-[#0e6983]">James R.</h3>
                <p className="text-sm text-gray-500 mb-4">Healthcare Worker</p>
                <p className="text-gray-700 text-sm">"As someone in the healthcare field, I'm impressed by the technology. It's a great first step for people who are hesitant to seek help."</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
