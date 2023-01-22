import { Button, Card, Flex, Grid, Group, Input, Space, Text, Title } from "@mantine/core";
import { Container } from '@mantine/core';
import { json, LoaderArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

export async function action({ params, request }: any) {

}

export const loader = async ({ request, params }: LoaderArgs) => {
  const productId = params.productId;
  const cookie = request.headers.get("Cookie");

  const token = cookie!.replace('tabemano-session=', '');

  console.log(token);

  console.log(JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()));

  console.log(productId);

  return json({ productId });
};

export default function Payment() {
  return (
    <Container size={"lg"}>
      <Grid>
        <Grid.Col span={12}>
          <Flex justify="center">
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Sign up</Text>
              </Group>
              <Form method="post">
                <Input
                  name="name"
                  placeholder="Name"
                />
                <Space h="xs"/>
                <Input
                  name="email"
                  placeholder="Email"
                />
                <Space h="xs"/>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <Space h="xs"/>
                <Input
                  name="repeatPassword"
                  type="password"
                  placeholder="Repeat password"
                />
                <Button type="submit" variant="light" color="blue" fullWidth mt="md" radius="md">
                  Sign Up
                </Button>
              </Form>
            </Card>
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>

  );
}
