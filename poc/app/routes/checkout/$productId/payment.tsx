import { Button, Card, Flex, Grid, Group, Input, Space, Text } from "@mantine/core";
import { Container } from '@mantine/core';
import { json, LoaderArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const loader = async ({ request, params }: LoaderArgs) => {
  const productId = params.productId;
  const cookie = request.headers.get("Cookie");

  const encryptedCookieValue = cookie!.replace('tabemano-session=', '');

  const token = Buffer.from(encryptedCookieValue, 'base64').toString();

  const tokenPayload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

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
                <Text weight={500}>Payment</Text>
              </Group>
              <Form method="post">
                <Input
                  name="name"
                  placeholder="Name"
                />
                <Space h="xs"/>
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
