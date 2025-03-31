import React, { useState, useEffect } from 'react';

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
    <div>
      <div>
        <h2>
          Your Matches <span>Pop Tart Lovers!</span>
        </h2>
        {matches.length === 0 ? (
          <p>No matches found.</p>
        ) : (
          <ul>
            {matches.map((match) => (
              <li key={match.id}>
                <div>
                  <div>
                    <img src={`https://randomuser.me/api/portraits/men/${match.id}.jpg`} alt={match.name} />
                  </div>
                  <div>
                    <p>{match.name}</p>
                    <p>{match.popTartFlavor} Pop Tart Lover</p>
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
