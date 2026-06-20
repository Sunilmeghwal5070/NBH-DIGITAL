import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const slides = [
  {
    title: "Digital\nNimbahera",
    subtitle: "Your City. Your Services. One App.",
    type: "splash",
    image: "https://i.pinimg.com/474x/92/89/ab/9289ab9601c7dbc835bd0b05f3547985.jpg" // Using provided image
  },
  {
    title: "Discover Local\nBusinesses",
    description: "Find trusted businesses, services,\noffers, and deals from across the city.",
    type: "slide",
    icon: "🏪" // Placeholder for the illustration
  },
  {
    title: "Best Deals Around\nYou",
    description: "Discover exclusive offers from shops\nand services in your city",
    type: "slide",
    icon: "🛍️"
  },
  {
    title: "Play. Vote. Win\nRecognition",
    description: "Join daily quizzes, challenges, and\npolls to climb the leaderboard and earn\nachievements.",
    type: "slide",
    icon: "🏆"
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentSlide === 0) {
      const timer = setTimeout(() => {
        if (localStorage.getItem('onboardingCompleted') === 'true') {
          navigate('/home');
        } else {
          setCurrentSlide(1);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, navigate]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const finishOnboarding = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    navigate('/home');
  };

  if (slides[currentSlide].type === "splash") {
    return (
      <motion.div
        key="splash"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col h-screen w-full bg-[#4f46e5] text-white overflow-hidden font-sans relative items-center justify-center"
      >
        <div className="z-10 flex flex-col items-center text-center px-4 mt-10">
            <img src={slides[0].image} className="w-36 h-36 rounded-3xl shadow-2xl mb-8 object-cover border-4 border-white/20" alt="App Logo" />
            <h1 className="text-4xl font-black mb-4 leading-tight whitespace-pre-line">{slides[0].title}</h1>
            <p className="text-blue-100 text-lg font-medium max-w-xs mx-auto">{slides[0].subtitle}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-white text-gray-900 overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="flex flex-col items-center justify-between flex-grow pt-24 pb-12 px-6"
        >
          <div className="flex flex-col items-center text-center w-full">
            <div className="text-8xl mb-12">
               {slides[currentSlide].icon}
            </div>
            <h2 className="text-4xl font-extrabold mb-6 leading-tight whitespace-pre-line text-gray-900">
              {slides[currentSlide].title}
            </h2>
            <p className="text-lg text-gray-500 whitespace-pre-line font-medium leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </div>

          <div className="w-full flex items-center justify-between mt-auto">
            <div className="flex space-x-2">
              {slides.slice(1).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide - 1 === idx ? 'w-6 bg-[#4f46e5]' : 'w-2 bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <button 
                onClick={currentSlide === slides.length - 1 ? finishOnboarding : nextSlide}
                className="bg-[#4f46e5] text-white px-10 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-sm"
            >
                {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
