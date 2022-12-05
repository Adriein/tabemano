import { Flex, Grid, Title } from "@mantine/core";
import { Container } from '@mantine/core';


export default function Index() {
  return (
    <Container size={"lg"}>
      <Grid>
        <Grid.Col span={12}>
          <Flex justify="center">
            <Title order={1}>Dashboard</Title>
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>

  );
}
