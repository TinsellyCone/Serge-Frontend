import ModelSettings from '@/components/modelSettings'
import {
  Center,
  Flex,
  Stack,
  Button,
  Slider,
  Select,
  NumberInput,
  Textarea,
} from '@mantine/core'
import { modals } from '@mantine/modals'

export default function Home() {
  return (
    <>
      <Center h={'100%'}>
        <Stack align='center' spacing={'lg'}>
          <h1 style={{ margin: 0 }}>Welcome to {process.env.NEXT_PUBLIC_SERVICE_NAME}!</h1>
          <h3 style={{ margin: 0 }}>
            {process.env.NEXT_PUBLIC_SERVICE_TAGLINE}
          </h3>
          <Flex gap={'sm'}>
            <Button
              onClick={() =>
                modals.open({
                  title: 'New Chat',
                  centered: true,
                  size: 'xl',
                  children: <ModelSettings />,
                })
              }
            >
              Start a chat
            </Button>
            <Button variant='light'>Download models</Button>
          </Flex>
        </Stack>
      </Center>
    </>
  )
}