import { Button } from "@mantine/core";
import React from 'react';
import { useNavigate } from "react-router-dom";

const Invoices = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate('/invoice/design', { replace: true })}>Design your own invoice</Button>
    </>
  )
}

export default Invoices;