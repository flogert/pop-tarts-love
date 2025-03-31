import React from 'react';
import Link from 'next/link';

const IndexPage = () => {
  return (
    <div className="container">
      {/* Main Title */}
      <h1>
        Welcome to
      </h1>

      {/* Image */}
      <Link href='/'>
        <img
          src="logo.webp" // Replace this with your actual image URL
          alt="Pop Tarts Love"
          className='logo'
          style={{ width: '450px', height: '450px' }}
        />
      </Link>

      {/* Description */}
      <h3 className='start'>
        Find your perfect match based on your love for Pop Tart flavors! 🍓🍫
        <p>Start your journey today and discover someone who shares your passion
        for sweet treats.</p>
      </h3>


      {/* Action Buttons */}
      <div>
        <Link href="/signup">
          <button className="btn btn-signup">
            Get Started
          </button>
        </Link>
        <Link href="/login">
          <button className="btn btn-login">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default IndexPage;
