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
          style={{ width: '100%', maxWidth: '450px', height: 'auto' }}
        />
      </Link>

      {/* Description */}
      <h3 className='start' style={{ textAlign: 'center', padding: '0 1rem' }}>
        Find your perfect match based on your love for Pop Tart flavors! 🍓🍫
        <p>Start your journey today and discover someone who shares your passion
        for sweet treats.</p>
      </h3>


      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '400px' }}>
        <Link href="/signup" style={{ width: '100%' }}>
          <button className="btn btn-signup">
            Get Started
          </button>
        </Link>
        <Link href="/login" style={{ width: '100%' }}>
          <button className="btn btn-login">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default IndexPage;
