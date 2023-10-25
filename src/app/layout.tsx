import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import UserProvider from '@/UserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Devot Time',
  description: 'Track time with these tools',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </UserProvider>
  );
}
