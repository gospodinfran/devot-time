import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import UserProvider from '@/UserContext';
import Header from '@/components/Header';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
});

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
        <body className={roboto.className}>
          <Header />
          {children}
        </body>
      </html>
    </UserProvider>
  );
}
