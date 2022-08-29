import React from 'react';
import { AppShell } from '@mantine/core';
import Header from '../Header';
import NavBar from "../NavBar";

const Shell = ({ children }: { children: any }) => {
  return (
    <AppShell
      padding="md"
      navbar={<NavBar/>}
      header={<Header/>}
    >
      {children}
    </AppShell>
  );
}

export default Shell;