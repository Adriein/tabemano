import { Button, Card, Flex, Grid, Group, Table, Text, Badge } from "@mantine/core";
import { Container } from '@mantine/core';
import { json, LoaderArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Checkout, TabemanoApi } from "~/api/routes";
import { getJwtPayload } from "~/authentication/session";

export const loader = async ({ request, params }: LoaderArgs) => {
  const productId = params.productId;

  const tokenPayload = getJwtPayload(request);

  const response = await fetch(`${TabemanoApi.v1}${Checkout.product.detail(productId!)}`, {
    method: 'GET', mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  });

  const tabemanoResponse = await response.json();
  console.log(tabemanoResponse);
  console.log(tokenPayload);

  return json(
    {
      user: {
        name: tokenPayload.name,
        email: tokenPayload.email
      },
      product: {
        name: tabemanoResponse.data.name,
        description: tabemanoResponse.data.description,
        price: tabemanoResponse.data.price,
        currency: tabemanoResponse.data.currency,
      }
    }
  );
};

export default function Payment() {
  const { product, user } = useLoaderData<typeof loader>();
  return (
    <Container size={"lg"}>
      <Grid>
        <Grid.Col span={12}>
          <Flex justify="center">
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Text weight={500}>Payment Resume</Text>
              <Group position="apart" mt="md" mb="xs">
                <Text fz={'md'}>Name: {user.name}</Text>
                <Text fz={'md'}>Email: {user.email}</Text>
              </Group>
              <Table>
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
                </thead>
                <tbody>
                <tr key={product.name}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price} {product.currency}</td>
                </tr>
                </tbody>
              </Table>
              <Form method="post">
                <Button type="submit" variant="light" color="blue" fullWidth mt="md" radius="md">
                  Pay
                </Button>
              </Form>
            </Card>
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>

  );
}
