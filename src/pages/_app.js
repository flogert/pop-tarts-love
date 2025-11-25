import '../styles/globals.css';
import Head from 'next/head';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}

export default MyApp;
