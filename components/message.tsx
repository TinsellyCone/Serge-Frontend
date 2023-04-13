import { Avatar, DefaultMantineColor, Flex, Paper, Text } from '@mantine/core'
import { ReactElement } from 'react'

export default function Message({
  message,
  author,
  side
}: {
  message: string
  author: { name: string; icon: ReactElement, color: DefaultMantineColor | undefined }
  side: "left" | "right"
}) {
  return (
    <>
      <Flex mx={15} gap={10} my={20} direction={side == 'right' ? 'row-reverse' : 'row'}>
        <Avatar title={author.name} alt={author.name} radius='xl' color={author.color}>{author.icon}</Avatar>
        <Paper withBorder shadow='md' p='md' radius='md' w='max-content' maw='35%'>
          <Text>{message}</Text>
        </Paper>
      </Flex>
    </>
  )
}
