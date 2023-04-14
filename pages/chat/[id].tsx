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
      error?: string
      typing?: boolean
      loading?: boolean
    }[]
  >([])

  const router = useRouter()

  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error, isLoading } = useSWR(
    '/api/chat/' + router.query.id,
    fetcher
  )
  // const { data: test } = useSWR(
  //   '/api/chat/' + router.query.id + '/question?prompt=Tell+me+about+the+James+Webb+Space+Telescope',
  //   fetcher
  // )
  var tempMessages: any[] = []
  useEffect(() => {
    if (messages != null && !isLoading && data != null) {
      data.questions?.map(
        (current: {
          _id: string
          question: string
          answer: string
          error?: string
        }) => {
          tempMessages = [
            ...tempMessages,
            { author: 'user', message: current.question },
            { author: 'robot', message: current.answer, error: current.error },
          ]
        }
      )
      setMessages(tempMessages)
    }
  }, [!isLoading])
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
                message={
                  current.error != null ? current.error : current.message
                }
                author={{ name: 'Robot', icon: <IconRobot />, color: 'blue' }}
              />
            )
          }
        })}
      </div>

      <MessageInput submit={sendMessage} />
    </>
  )
  async function sendMessage(message: string) {
    // setMessages([...messages, { author: 'user', message: message, loading: false, typing: false }])
    messages.push({
      author: 'user',
      message: message,
      loading: false,
      typing: false,
    })
    var response = new EventSource('/api/chat/' + router.query.id + '/question?prompt=' + message.replaceAll(' ', '+'));

    messages.push({ author: 'robot', message: '', loading: true, typing: true })
    setMessages([...messages])
    console.log(messages)
    response.addEventListener("message", (event) => {
      messages[messages.length - 1].loading = false;
      messages[messages.length - 1].message = messages[messages.length - 1].message + event.data;
      setMessages([...messages])
      console.log(event);
    })
    response.addEventListener("close", (event) => {
      response.close();
      messages[messages.length - 1].typing = false;
      setMessages([...messages])
    })
  }
}
