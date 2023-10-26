import { useEffect, useState } from 'react';

export default function useLocalStorage() {
  const [user, setUser] = useState<null | string>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return [user, setUser] as [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ];
}
