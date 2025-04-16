import React, { useState } from "react";

const Slid = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const questions = [
    {
      section: "Emotional State",
      question: "How have you been feeling emotionally over the past two weeks?"
    },
    {
      section: "Emotional State",
      question: "Have you been feeling sad, down, or hopeless more often than usual?"
    },
    {
      section: "Emotional State",
      question: "Do you find it hard to stay positive about things happening around you?"
    },
    {
      section: "Emotional State",
      question: "Have there been times you've felt emotionally numb or disconnected?"
    },
    {
      section: "Emotional State",
      question: "Do you feel anxious or on edge during your day?"
    },
    {
      section: "Sleep & Fatigue",
      question: "How many hours do you sleep on average each night?"
    },
    {
      section: "Sleep & Fatigue",
      question: "Do you wake up feeling rested or still tired?"
    },
    {
      section: "Sleep & Fatigue",
      question: "Do you find it hard to fall asleep or stay asleep?"
    },
    {
      section: "Sleep & Fatigue",
      question: "Do you take daytime naps often because of low energy?"
    },
    {
      section: "Sleep & Fatigue",
      question: "Have your sleep patterns changed recently due to stress or thoughts?"
    },
    {
      section: "Appetite & Body",
      question: "Have you been eating less or more than usual lately?"
    },
    {
      section: "Appetite & Body",
      question: "Do you sometimes skip meals without realizing?"
    },
    {
      section: "Appetite & Body",
      question: "Has food stopped feeling enjoyable for you?"
    },
    {
      section: "Appetite & Body",
      question: "Have you noticed changes in your weight recently?"
    },
    {
      section: "College & Daily Life",
      question: "Can you walk me through a typical day at college?"
    },
    {
      section: "College & Daily Life",
      question: "Are you able to complete assignments and attend classes regularly?"
    },
    {
      section: "College & Daily Life",
      question: "Do you often procrastinate even when deadlines are near?"
    },
    {
      section: "College & Daily Life",
      question: "Do you feel burnout from academics or extracurriculars?"
    },
    {
      section: "College & Daily Life",
      question: "Are you juggling too many responsibilities right now?"
    },
    {
      section: "Social Connections",
      question: "Do you spend time with friends regularly or feel isolated?"
    },
    {
      section: "Social Connections",
      question: "Do you have someone you talk to when you're stressed or upset?"
    },
    {
      section: "Social Connections",
      question: "Have you been avoiding social events or group activities lately?"
    },
    {
      section: "Social Connections",
      question: "Do you feel like you're drifting away from people close to you?"
    },
    {
      section: "Thought Patterns & Self-Worth",
      question: "Do you find it hard to concentrate or focus for long?"
    },
    {
      section: "Thought Patterns & Self-Worth",
      question: "Do you ever feel like you're not good enough, even when others say you are?"
    },
    {
      section: "Thought Patterns & Self-Worth",
      question: "Do you feel guilty about things that aren't your fault?"
    },
    {
      section: "Thought Patterns & Self-Worth",
      question: "Have you been questioning your purpose or direction in life?"
    },
    {
      section: "Thought Patterns & Self-Worth",
      question: "Do you sometimes feel like your presence doesn't matter to others?"
    },
    {
      section: "Coping & Emotional Control",
      question: "When you're feeling low, how do you usually cope?"
    },
    {
      section: "Coping & Emotional Control",
      question: "Have you experienced any emotional breakdowns or crying spells recently?"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % questions.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + questions.length) % questions.length);
  };

  const startInterview = () => {
    setInterviewStarted(true);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4">
      {!interviewStarted ? (
        <div className="flex flex-col items-center justify-center h-[400px] bg-black rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-8">Depression Assessment Interview</h2>
          <p className="text-xl text-white mb-8 text-center max-w-2xl">
            This interview will help us understand your current emotional state and well-being.
            Take your time to answer each question honestly. <strong> Before starting the interview, make sure that you've started the audio recording. </strong>
          </p>
          <button
            onClick={startInterview}
            className="bg-[#0e6983] text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-[#0a4f63] transition-colors"
          >
            Start Interview
          </button>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-lg shadow-xl">
          <div className="relative h-[400px]">
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black text-white p-8">
              <h2 className="text-2xl font-bold mb-4">{questions[currentSlide].section}</h2>
              <p className="text-xl text-center max-w-2xl">{questions[currentSlide].question}</p>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#0e6983] text-white p-3 rounded-full shadow-lg hover:bg-[#0a4f63] transition-colors"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#0e6983] text-white p-3 rounded-full shadow-lg hover:bg-[#0a4f63] transition-colors"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide
                    ? "bg-[#0e6983]"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Slid;
