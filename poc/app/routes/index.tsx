import { Flex, Grid, Title, Card, Group, Text, Button, Input, Space } from "@mantine/core";
import { Container } from '@mantine/core';
import { Form, useLoaderData } from "@remix-run/react";
import {
  json,
  redirect,
} from "@remix-run/node";
import { Link } from "react-router-dom";

export const loader = async () => {
  const response = await fetch('http://localhost:5000/api/v1/checkout/products?country=ES', {
    method: 'GET', mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  });

  const tabemanoResponse = await response.json();

  return json({ products: tabemanoResponse.data });
};

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
  const { products } = useLoaderData<typeof loader>();
  const spanProductHero = 12 / products.length;
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
                <Space h="xs"/>
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
        <Grid.Col span={12}>
          <Grid>
            {products.map((product: { id: string, name: string, currency: string, price: string, description: string }) => {
              return (
                <Grid.Col span={spanProductHero}>
                  <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Text size="sm" color="dimmed">
                      {product.name}
                    </Text>

                    <Text size="sm" color="dimmed">
                      {product.description}
                    </Text>

                    <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                      <Link to={`/checkout/${product.id}/registration`}>{product.price} {product.currency}</Link>
                    </Button>
                  </Card>
                </Grid.Col>
              )
            })}
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>

  );
}
