import { Avatar, DefaultMantineColor, Flex, Loader, Paper, Text } from '@mantine/core'
import { ReactElement } from 'react'

export default function Message({
  message,
  author,
  side,
  typing,
  loading,
}: {
  message: string
  author: {
    name: string
    icon: ReactElement
    color: DefaultMantineColor | undefined
  }
  side: 'left' | 'right'
  typing?: boolean
  loading?: boolean
}) {
  return (
    <>
      <Flex
        mx={15}
        gap={10}
        my={20}
        direction={side == 'right' ? 'row-reverse' : 'row'}
      >
        <Avatar
          title={author.name}
          alt={author.name}
          radius='xl'
          color={author.color}
          mt={6}
        >
          {author.icon}
        </Avatar>
        <Paper
          withBorder
          shadow='sm'
          p='sm'
          radius='lg'
          w='max-content'
          maw='65%'
        >
          {loading ? <Loader size={21} variant='bars' /> : <Text style={{overflowWrap: 'break-word'}}>
            {message}
            {typing ? (
              <span
                style={{ animation: 'cursorBlink infinite 1s' }}
              >
                {' '}
                █
              </span>
            ) : null}
          </Text>}
        </Paper>
      </Flex>
    </>
  )
}
