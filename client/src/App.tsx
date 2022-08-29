import React, { Suspense } from 'react';
import { AuthProvider } from './Auth/Context/AuthContext';
import InvoiceDesign from "./Pages/InvoiceDesign";
import Invoices from "./Pages/Invoices";
import Shell from "./Shared/Components/Shell";
import { UsersProvider } from './Users/Context/UsersContext';
import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import RequireAuth from "./Pages/RequireAuth";
import Clients from "./Pages/Clients";
import { Toaster } from 'react-hot-toast';
import { MantineProvider } from '@mantine/core';
import { theme } from "./Shared/theme";

function App() {
  return (
    <Suspense fallback={'loading'}>
      <MantineProvider theme={theme}>
        <Toaster/>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/clients" element={
              <RequireAuth>
                <UsersProvider>
                  <Shell>
                    <Clients/>
                  </Shell>
                </UsersProvider>
              </RequireAuth>
            }/>
            <Route path="/invoices" element={
              <RequireAuth>
                <Shell>
                  <Invoices/>
                </Shell>
              </RequireAuth>
            }/>
            <Route path="/invoice/design" element={
              <RequireAuth>
                <Shell>
                  <InvoiceDesign/>
                </Shell>
              </RequireAuth>
            }/>
          </Routes>
        </AuthProvider>
      </MantineProvider>
    </Suspense>
  );
}

export default App;
