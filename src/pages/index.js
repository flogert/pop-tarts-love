import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const IndexPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Main Title */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-bold text-center mb-8 text-gray-800"
      >
        Welcome to
      </motion.h1>

      {/* Image */}
      <Link href='/'>
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          src="logo.webp"
          alt="Pop Tarts Love"
          className="w-full max-w-md h-auto mb-8 hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Description */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center max-w-2xl mb-12 px-4"
      >
        <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
          Find your perfect match based on your love for Pop Tart flavors! 🍓🍫
        </h3>
        <p className="text-lg text-gray-600">
          Start your journey today and discover someone who shares your passion for sweet treats.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <Link href="/signup" className="w-full">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Get Started
          </motion.button>
        </Link>
        <Link href="/login" className="w-full">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-white text-purple-600 border-2 border-purple-600 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-purple-50 transition-colors duration-200"
          >
            Log In
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default IndexPage;
