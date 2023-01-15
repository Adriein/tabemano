import { Flex, Grid, Title } from "@mantine/core";
import { Container } from '@mantine/core';

// @ts-ignore
export async function action({ params }) {
  const id = params.productId;
  console.log(id);
}

export default function Registration() {
  return (
    <Container size={"lg"}>
      <Grid>
        <Grid.Col span={12}>
          <Flex justify="center">
            <Title order={1}>Registration</Title>
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>

  );
}
