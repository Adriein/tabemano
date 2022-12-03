import { Flex, Grid, Title, Card, Group, Text, Button, Input } from "@mantine/core";
import { Container } from '@mantine/core';

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
              <Input
                placeholder="Email"
              />
              <Input
                placeholder="Password"
              />
              <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                Book classic tour now
              </Button>
            </Card>
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>

  );
}
