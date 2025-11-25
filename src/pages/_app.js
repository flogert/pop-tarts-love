import '../styles/globals.css';
import Head from 'next/head';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 font-sans text-gray-900">
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}

export default MyApp;
