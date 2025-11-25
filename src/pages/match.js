import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const MatchPage = () => {
  const [matches, setMatches] = useState([]);

  // Simulate fetching data from backend (replace with actual API call later)
  useEffect(() => {
    // Simulate an API call and fetch real data here
    // Example:
    // fetch('/api/matches')
    //   .then(response => response.json())
    //   .then(data => setMatches(data));

    // For now, we will keep it empty as per your request
    setMatches([]); // No mock matches
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 text-purple-700 font-['Agbalumo']">
          Your Matches <span className="block text-lg md:text-xl text-pink-500 mt-1 font-sans">Pop Tart Lovers!</span>
        </h2>
        {matches.length === 0 ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
          >
            <p className="text-lg text-gray-600">No matches found yet.</p>
            <p className="text-gray-500 mt-2 text-sm">Check back later for more sweet connections!</p>
            <Link href="/profile">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-600 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700 transition-colors mt-4 text-sm"
                >
                    Go to Profile
                </motion.button>
            </Link>
          </motion.div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((match) => (
              <li key={match.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="flex flex-col items-center p-4">
                  <div className="w-24 h-24 mb-3 rounded-full overflow-hidden border-4 border-purple-200 relative">
                    <Image 
                      src={`https://randomuser.me/api/portraits/men/${match.id}.jpg`} 
                      alt={match.name} 
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-800">{match.name}</p>
                    <p className="text-pink-600 font-medium text-sm">{match.popTartFlavor} Pop Tart Lover</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export default MatchPage;
