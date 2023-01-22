import { Button, Card, Flex, Grid, Group, Input, Space, Text } from "@mantine/core";
import { Container } from '@mantine/core';
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

export async function action({ params, request }: any) {
  const form = await request.formData();

  const response = await fetch('http://localhost:5000/api/v1/register/tenant', {
    method: 'POST', mode: 'cors', body: JSON.stringify({
      name: form.get('name'),
      email: form.get('email'),
      password: form.get('password')
    }),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  });

  const cookie = response.headers.get("set-cookie");

  if (!cookie) {
    //return redirect('/');
  }

  const headers = new Headers();

  headers.append('Set-cookie', cookie!);

  return redirect(`/checkout/${params.productId}/payment`, { headers });
}

export default function Registration() {
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
