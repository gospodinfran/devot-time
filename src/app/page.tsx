'use client';

import Header from '@/components/Header';
import HomeContainer from '@/components/HomeContainer';
import LoginForm from '@/components/LoginForm';
import Trackers from '@/components/Trackers';
import useLocalStorage from '@/customHooks/useLocalStorage';
import { useState } from 'react';
import { Task } from './types';

export default function Home() {
  const [user, setUser] = useLocalStorage();
  const [register, setRegister] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dateSelected, setDateSelected] = useState<Date>(new Date());

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
          <Trackers
            date={dateSelected}
            onDateChange={setDateSelected}
            user={user}
            tasks={tasks}
            setTasks={setTasks}
          />
        )}
      </HomeContainer>
    </>
  );
}
