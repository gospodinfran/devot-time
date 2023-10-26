'use client';

import Header from '@/components/Header';
import HomeContainer from '@/components/HomeContainer';
import useLocalStorage from '@/customHooks/useLocalStorage';

export default function History() {
  const [user, setUser] = useLocalStorage();

  return (
    <>
      <Header user={user} setUser={setUser} onHistory={true} />
      <HomeContainer>
        <div></div>
      </HomeContainer>
    </>
  );
}
