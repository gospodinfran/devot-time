'use client';

import { UserContext, UserContextInterface, useUser } from '@/UserContext';
import { useContext } from 'react';

export default function Home() {
  const userContext = useContext(UserContext);

  if (!userContext || !userContext.user) {
    return <div>Please log in</div>;
  }

  const { user, setUser, register, setRegister } = userContext;

  return <main>Welcome {user}!</main>;
}
