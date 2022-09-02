import { Button, Navbar } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Navbar width={{ base: 200 }} height={window.innerHeight - 60} p="xs">
      <Button onClick={() => navigate('/invoices', { replace: true })}>Invoices</Button>
      <Button onClick={() => navigate('/clients', { replace: true })}>Clients</Button>
    </Navbar>
  );
}

export default NavBar;