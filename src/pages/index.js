import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import InteractiveWaveBackground from '../components/InteractiveWaveBackground';

const IndexPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden z-0">
      <InteractiveWaveBackground waveColors={['#9333ea', '#ec4899']} />
      
      {/* Center Blur Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          <div className="w-full h-full backdrop-blur-[2px] [mask-image:radial-gradient(circle_at_center,black_0%,transparent_70%)]"></div>
      </div>

      {/* Main Title */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-5xl font-bold text-center mb-6 text-gray-800 font-['Agbalumo'] z-10"
      >
        Welcome to
      </motion.h1>

      {/* Image */}
      <Link href='/' className="z-10">
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          src="logo.webp"
          alt="Pop Tarts Love"
          className="w-full max-w-xs md:max-w-sm h-auto mb-6 hover:scale-105 transition-transform duration-300 drop-shadow-2xl"
        />
      </Link>

      {/* Description */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center max-w-xl mb-8 px-4 z-10"
      >
        <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
          Find your perfect match based on your love for Pop Tart flavors! 🍓🍫
        </h3>
        <p className="text-base text-gray-600">
          Start your journey today and discover someone who shares your passion for sweet treats.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col gap-3 w-full max-w-xs z-10"
      >
        <Link href="/signup" className="w-full">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-purple-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-200 text-sm"
          >
            Get Started
          </motion.button>
        </Link>
        <Link href="/login" className="w-full">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-white text-purple-600 border-2 border-purple-600 font-bold py-2 px-6 rounded-full shadow-lg hover:bg-purple-50 transition-colors duration-200 text-sm"
          >
            Log In
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default IndexPage;
