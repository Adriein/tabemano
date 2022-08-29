import { Header as MantineHeader, Text } from '@mantine/core';
import React from "react";

const Header = () => {
  return (
    <MantineHeader height={60} p="xs">
      <Text>Tabemano</Text>
    </MantineHeader>
  );
}

export default Header;