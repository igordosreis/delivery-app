import { ReactNode } from 'react';

import { ChildrenProps } from '@/interfaces/Components';

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
