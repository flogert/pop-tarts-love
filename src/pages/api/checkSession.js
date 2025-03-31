// pages/api/checkSession.js

import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    // If a session exists, return the session object
    res.status(200).json({ authenticated: true, user: session.user });
  } else {
    // If no session, return not authenticated
    res.status(200).json({ authenticated: false });
  }
}
