'use client';

import { UserContext } from '@/UserContext';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import 'primeicons/primeicons.css';

interface HeaderProps {
  user: null | string;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header() {
  const userContext = useContext(UserContext);
  if (userContext) {
    const { user, setUser } = userContext;

    return (
      <div className="absolute w-full h-24 bg-violet-950 text-white text-2xl shadow-xl rounded-b-3xl">
        <div className="h-full w-full flex justify-between items-center">
          <div className="text-xl ml-8 flex items-center gap-6">
            <Image src={'/devot_logo.png'} alt="Logo" width={160} height={60} />
            <h2>Tracking tool</h2>
          </div>

          {user && (
            <div className="text-base font-thin text-slate-300 w-80 md:w-[30rem] flex justify-center items-center">
              <button className="h-24 w-full border-transparent border-b-[3px] hover:border-orange-500 hover:text-white">
                <span className="pi pi-clock mr-2" />
                Trackers
              </button>
              <button className="h-24 w-full border-transparent border-b-[3px] hover:border-orange-500 hover:text-white">
                <span className="pi pi-history mr-2" />
                History
              </button>
              <button
                className="mr-8 h-20 w-full hover:text-white"
                onClick={() => setUser(null)}
              >
                <span className="pi pi-power-off mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
