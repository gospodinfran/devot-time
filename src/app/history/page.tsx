'use client';

import Header from '@/components/Header';
import useLocalStorage from '@/customHooks/useLocalStorage';

export default function History() {
  const [user, setUser] = useLocalStorage();

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <div>History</div>;
    </div>
  );
}
