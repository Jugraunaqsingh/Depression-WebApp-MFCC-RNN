import React from 'react';
import { 
  MicrophoneIcon, 
  ShieldCheckIcon, 
  ChartBarIcon, 
  UserGroupIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const Features = () => {
  return (
    <div className="bg-[#e9f3f6] py-16">
      <div className="mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[#0e6983] sm:text-4xl">
            Our Features
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover how our technology can help you understand and manage your mental health
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <MicrophoneIcon className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-[#0e6983] mb-2">Voice Analysis</h3>
            <p className="text-gray-600">Advanced voice analysis technology to detect depression patterns</p>
            <div className="mt-4 flex items-center text-sm text-blue-500">
              <span className="mr-2">Learn more</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheckIcon className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-[#0e6983] mb-2">Privacy Protection</h3>
            <p className="text-gray-600">Your voice recordings are kept confidential and secure</p>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <span className="mr-2">Learn more</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <ChartBarIcon className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-[#0e6983] mb-2">Accurate Results</h3>
            <p className="text-gray-600">High accuracy in detecting depression symptoms</p>
            <div className="mt-4 flex items-center text-sm text-purple-500">
              <span className="mr-2">Learn more</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <UserGroupIcon className="h-6 w-6 text-pink-500" />
            </div>
            <h3 className="text-lg font-semibold text-[#0e6983] mb-2">Community Support</h3>
            <p className="text-gray-600">Connect with others and share experiences</p>
            <div className="mt-4 flex items-center text-sm text-pink-500">
              <span className="mr-2">Learn more</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <ClockIcon className="h-6 w-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-[#0e6983] mb-2">Quick Analysis</h3>
            <p className="text-gray-600">Get results in under 30 seconds</p>
            <div className="mt-4 flex items-center text-sm text-orange-500">
              <span className="mr-2">Learn more</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-indigo-500" />
            </div>
            <h3 className="text-lg font-semibold text-[#0e6983] mb-2">Professional Guidance</h3>
            <p className="text-gray-600">Access to mental health professionals</p>
            <div className="mt-4 flex items-center text-sm text-indigo-500">
              <span className="mr-2">Learn more</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <DocumentTextIcon className="h-6 w-6 text-teal-500" />
            </div>
            <h3 className="text-lg font-semibold text-[#0e6983] mb-2">Detailed Reports</h3>
            <p className="text-gray-600">Comprehensive analysis of your results</p>
            <div className="mt-4 flex items-center text-sm text-teal-500">
              <span className="mr-2">Learn more</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <ArrowPathIcon className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-[#0e6983] mb-2">Regular Updates</h3>
            <p className="text-gray-600">Continuous improvement of our detection system</p>
            <div className="mt-4 flex items-center text-sm text-red-500">
              <span className="mr-2">Learn more</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
