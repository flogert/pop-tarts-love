import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
    <div className="min-h-screen flex flex-col items-center p-4 pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 text-purple-700">
          Your Matches <span className="block text-xl md:text-2xl text-pink-500 mt-2">Pop Tart Lovers!</span>
        </h2>
        {matches.length === 0 ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center bg-white p-8 rounded-xl shadow-lg"
          >
            <p className="text-xl text-gray-600">No matches found yet.</p>
            <p className="text-gray-500 mt-2">Check back later for more sweet connections!</p>
            <Link href="/profile">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-600 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700 transition-colors mt-6"
                >
                    Go to Profile
                </motion.button>
            </Link>
          </motion.div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <li key={match.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="flex flex-col items-center p-6">
                  <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-purple-200">
                    <img src={`https://randomuser.me/api/portraits/men/${match.id}.jpg`} alt={match.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-800">{match.name}</p>
                    <p className="text-pink-600 font-medium">{match.popTartFlavor} Pop Tart Lover</p>
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
