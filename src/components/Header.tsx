'use client';

import { UserContext, UserContextInterface } from '@/UserContext';
import Image from 'next/image';
import React, { SetStateAction, useContext, useState } from 'react';
import 'primeicons/primeicons.css';
import Link from 'next/link';

interface HeaderProps {
  user: string | null;
  setUser: React.Dispatch<SetStateAction<string | null>>;
}

export default function Header({ user, setUser }: HeaderProps) {
  return (
    <div className="fixed w-full h-24 bg-violet-950 text-white text-2xl shadow-xl rounded-b-3xl">
      <div className="h-full w-full flex justify-between items-center">
        <div className="text-xl ml-8 flex items-center gap-6">
          <Image src={'/devot_logo.png'} alt="Logo" width={160} height={60} />
          <h2>Tracking tool</h2>
        </div>

        {user && (
          <div className="text-base font-thin text-slate-300 w-80 md:w-[30rem] flex justify-center items-center">
            <Link href="/" passHref legacyBehavior>
              <a className="h-24 w-full border-transparent border-b-[3px] hover:border-orange-500 hover:text-white flex items-center justify-center">
                <span className="pi pi-clock mr-2" />
                Trackers
              </a>
            </Link>
            <Link href="/history" passHref legacyBehavior>
              <a
                className="h-24 w-full border-transparent border-b-[3px] hover:border-orange-500 hover:text-white flex items-center justify-center
                "
              >
                <span className="pi pi-history mr-2" />
                History
              </a>
            </Link>
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
