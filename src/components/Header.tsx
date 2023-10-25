import { UserContext } from '@/UserContext';
import React, { useContext, useState } from 'react';

interface HeaderProps {
  user: null | string;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header() {
  const userContext = useContext(UserContext);
  if (userContext) {
    const { user, setUser, setRegister } = userContext;

    return (
      <div className="h-20 bg-violet-600 text-white text-2xl shadow-xl rounded-b-3xl">
        <div className="h-full w-full flex justify-between items-center">
          <div className="text-xl ml-12">
            <div className="text-2xl">Devot Time</div>
          </div>

          <button className="mr-12" onClick={() => console.log('open login')}>
            {user ? 'Log out' : 'Log in'}
          </button>
        </div>
      </div>
    );
  }
}
