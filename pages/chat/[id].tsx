import Message from '@/components/message'
import { MessageInput } from '@/components/messageInput'
import { useMantineTheme } from '@mantine/core'
import { IconUser, IconRobot } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef, Component } from 'react'
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

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    // @ts-ignore
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error, isLoading } = useSWR(
    '/api/chat/' + router.query.id,
    fetcher
  )
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
  useEffect(() => {scrollToBottom()})
  return (
    <>
      <div style={{ marginBottom: '12.5rem', width: '100%' , marginLeft: 'auto', marginRight: 'auto', maxWidth: 'min(1300px, calc(100vw - var(--mantine-navbar-width)))', position: 'relative' }}>
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
      <MessageInput submit={sendMessage} />
      <div ref={messagesEndRef} />
      </div>

    </>
  )
  async function sendMessage(message: string) {
    messages.push({
      author: 'user',
      message: message,
      loading: false,
      typing: false,
    }) // Add the user's message to the list
    messages.push({ author: 'robot', message: '', loading: true, typing: true }) // Add a new message to the list
    setMessages([...messages]) // Causes the page re-render so that new message is displayed
    var response = new EventSource(
      '/api/chat/' + router.query.id + '/question?prompt=' + message.replaceAll(' ', '+')
    ) // Send the user's message to the server and wait for a response

    console.log(messages)
    response.addEventListener('message', event => {
      messages[messages.length - 1].loading = false
      messages[messages.length - 1].message =
        messages[messages.length - 1].message + event.data
      setMessages([...messages])
      console.log(event)
    }) // Handle the response from the server
    response.addEventListener('close', () => {
      response.close()
      messages[messages.length - 1].typing = false
      messages[messages.length - 1].typing = false
      setMessages([...messages])
    })
  }
}
