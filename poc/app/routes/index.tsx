import { Flex, Grid, Title, Card, Group, Text, Button, Input } from "@mantine/core";
import { Container } from '@mantine/core';
import { Form } from "@remix-run/react";

export const action = async ({ request }: any) => {
  const form = await request.formData();
  console.log(form.get('email'));
  return null;
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
