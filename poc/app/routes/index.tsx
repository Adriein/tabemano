import { Flex, Grid, Title, Card, Group, Text, Button, Input } from "@mantine/core";
import { Container } from '@mantine/core';
import { Form } from "@remix-run/react";
import {
  redirect,
} from "@remix-run/node";


export const action = async ({ request }: any) => {
  const form = await request.formData();
  const response = await fetch('http://localhost:5000/api/v1/signin', {
    method: 'POST', mode: 'cors', body: JSON.stringify({
      email: form.get('email'),
      password: form.get('password')
    }),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  });

  const cookie = response.headers.get("set-cookie");

  if (!cookie) {
    return redirect('/');
  }

  const headers = new Headers();

  headers.append('Set-cookie', cookie!);

  return redirect('/dashboard', { headers });
};

export default function Index() {
  return (
    <Container size={"lg"}>
      <Grid>
        <Grid.Col span={12}>
          <Flex justify="center">
            <Title order={1}>Tabemano</Title>
          </Flex>
        </Grid.Col>
        <Grid.Col span={12}>
          <Flex justify="center">
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Log in</Text>
              </Group>
              <Form method="post">
                <Input
                  name="email"
                  placeholder="Email"
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <Button type="submit" variant="light" color="blue" fullWidth mt="md" radius="md">
                  Log in
                </Button>
              </Form>
            </Card>
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>

  );
}
