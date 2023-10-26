'use client';

import { UserContext, UserContextInterface } from '@/UserContext';
import Header from '@/components/Header';
import HomeContainer from '@/components/HomeContainer';
import LoginForm from '@/components/LoginForm';
import Trackers from '@/components/Trackers';
import useLocalStorage from '@/customHooks/useLocalStorage';
import { useContext, useState } from 'react';

export default function Home() {
  const [user, setUser] = useLocalStorage();
  const [register, setRegister] = useState(false);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <HomeContainer>
        {!user ? (
          <LoginForm
            setUser={setUser!}
            register={register}
            setRegister={setRegister}
          />
        ) : (
          <Trackers />
        )}
      </HomeContainer>
    </>
  );
}
