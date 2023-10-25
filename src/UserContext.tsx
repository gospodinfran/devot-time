'use client';

import { createContext, useContext, useState } from 'react';

export interface UserContextInterface {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  register: boolean;
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextInterface | null>(null);

export function useUser() {
  const context = useContext(UserContext);
  if (context) {
    return context as UserContextInterface;
  }
}

export default function UserProvider({ children }: { children: any }) {
  const [user, setUser] = useState<null | string>(null);
  const [register, setRegister] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, register, setRegister }}>
      {children}
    </UserContext.Provider>
  );
}
