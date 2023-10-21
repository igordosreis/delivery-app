import { ReactNode } from 'react';

import ChildrenProps from '@/interfaces/Children';

import Navbar from './Navbar';

export default function Layout({ children }: ChildrenProps) {
  return (
    <>
      <Navbar>
        <main>{children}</main>
      </Navbar>
    </>
  );
}
