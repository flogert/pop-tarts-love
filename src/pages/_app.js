
import '../styles/globals.css';
import Head from 'next/head';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen font-sans text-gray-900 flex flex-col relative overflow-hidden">
      {/* Fixed gradient background for all pages */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-br from-pink-300 via-purple-300 to-pink-300" />
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}

export default MyApp;
