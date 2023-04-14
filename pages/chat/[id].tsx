import Message from '@/components/message'
import { MessageInput } from '@/components/messageInput'
import { useMantineTheme } from '@mantine/core'
import { IconUser, IconRobot } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useSWR from 'swr'

export default function Chat() {
  const theme = useMantineTheme()

  const [messages, setMessages] = useState<
    {
      author: 'user' | 'robot'
      message: string
      typing?: boolean
      loading?: boolean
    }[]
  >([])

  useEffect(() => {
    fetch('/api/chat/31aab45d-7167-4be8-827d-88069d61279b').then(res =>
      res.json()
    )
  }, [])

  const router = useRouter()

  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error, isLoading } = useSWR(
    '/api/chat/' + router.query.id,
    fetcher
  )
  var tempMessages: any[] = []
  useEffect(() => {
    if(messages != null && !isLoading && data != null) {
       data.questions.map(
          (
            current: { _id: string; question: string; answer: string },
          ) => {
            tempMessages = [
              ...tempMessages,
              { author: 'user', message: current.question },
              { author: 'robot', message: current.answer },
            ]
          }
        );
        setMessages(tempMessages);
        console.log('Mapped!');
    }
  }, [!isLoading])
  console.log(tempMessages)
  console.log(messages)

  return (
    <>
      <div style={{ marginBottom: '12.5rem' }}>
        {messages.map((current, index) => {
          if (current.author == 'user') {
            return (
              <Message
                side='right'
                typing={current.typing}
                loading={current.loading}
                message={current.message}
                author={{ name: 'User', icon: <IconUser />, color: 'blue' }}
              />
            )
          } else {
            return (
              <Message
                side='left'
                typing={current.typing}
                loading={current.loading}
                message={current.message}
                author={{ name: 'Robot', icon: <IconRobot />, color: 'blue' }}
              />
            )
          }
        })}
      </div>

      <MessageInput submit={sendMessage} />
    </>
  )
  function sendMessage(message: string) {
    setMessages([...messages, { author: 'user', message: message }])
  }
}
