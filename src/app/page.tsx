'use client';

import { UserContext, UserContextInterface } from '@/UserContext';
import HomeContainer from '@/components/HomeContainer';
import LoginForm from '@/components/LoginForm';
import { useContext } from 'react';

export default function Home() {
  const userContext = useContext(UserContext);

  if (!userContext || !userContext.user) {
    return (
      <HomeContainer>
        <LoginForm
          setUser={userContext!.setUser!}
          register={userContext!.register}
          setRegister={userContext!.setRegister}
        />
      </HomeContainer>
    );
  }

  const { user, setUser, register, setRegister } = userContext;

  return <main>Welcome {user}!</main>;
}
