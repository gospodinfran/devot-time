'use client';

import Header from '@/components/Header';
import HomeContainer from '@/components/HomeContainer';
import LoginForm from '@/components/LoginForm';
import Trackers from '@/components/Trackers';
import { Task } from '@/components/types';
import useLocalStorage from '@/customHooks/useLocalStorage';
import { useState } from 'react';

export default function Home() {
  const [user, setUser] = useLocalStorage();
  const [register, setRegister] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dateSelected, setDateSelected] = useState<Date>(new Date());

  return (
    <>
      <Header user={user} setUser={setUser} onHistory={false} />
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
