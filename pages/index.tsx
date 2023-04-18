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
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'

export default function Home() {
  const form = useForm({
    initialValues: {
      modelChoice: '',
      temperature: 0,
      maxTextLength: 256,
      promptContextLength: 512,
      topK: 50,
      topP: 1,
      repeatLastN: 64,
      repeatPenalty: 1,
      threads: 4,
      prePrompt:
        'Below is an instruction that describes a task. Write a response that appropriately completes the request. The response must be accurate, concise and evidence-based whenever possible. A complete answer is always ended by [end of text].',
    },
  })
  return (
    <>
      <Center h={'100%'}>
        <Stack align='center' spacing={'lg'}>
          <h1 style={{ margin: 0 }}>Welcome to Serge!</h1>
          <h3 style={{ margin: 0 }}>
            An easy way to chat with Alpaca & other LLaMa based models.
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

function submit(values: any) {
  console.log(values)
}
