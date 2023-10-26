import { ReactNode } from 'react';

export default function HomeContainer({ children }: { children?: ReactNode }) {
  return <main className="overflow-y-hidden">{children}</main>;
}
