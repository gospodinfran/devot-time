import { ReactNode } from 'react';

export default function HomeContainer({ children }: { children: ReactNode }) {
  return <div className="relative overflow-y-hidden">{children}</div>;
}
