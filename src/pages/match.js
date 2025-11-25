import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
    <div className="container">
      <div className="w-full max-w-4xl p-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 text-purple-700">
          Your Matches <span className="block text-xl md:text-2xl text-pink-500 mt-2">Pop Tart Lovers!</span>
        </h2>
        {matches.length === 0 ? (
          <div className="text-center bg-white p-8 rounded-xl shadow-lg">
            <p className="text-xl text-gray-600">No matches found yet.</p>
            <p className="text-gray-500 mt-2">Check back later for more sweet connections!</p>
            <Link href="/profile">
                <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
                    Go to Profile
                </button>
            </Link>
          </div>
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
      </div>
    </div>
  );
};

export default MatchPage;
