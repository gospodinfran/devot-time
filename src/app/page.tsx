'use client';

import { UserContext, UserContextInterface, useUser } from '@/UserContext';
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import { useContext } from 'react';

export default function Home() {
  const userContext = useContext(UserContext);

  if (!userContext || !userContext.user) {
    return (
      <>
        <Header />
        <LoginForm
          register={userContext!.register}
          setRegister={userContext!.setRegister}
        />
      </>
    );
  }

  const { user, setUser, register, setRegister } = userContext;

  return <main>Welcome {user}!</main>;
}
