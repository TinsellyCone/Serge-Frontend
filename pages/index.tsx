import Message from '@/components/message';
import { MessageInput } from '@/components/messageInput';
import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconArrowRight, IconArrowLeft, IconUser } from '@tabler/icons-react';

export default function Home() {
  const theme = useMantineTheme();
  return (
    <>
      <Message side='left' message='test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test ' author={{name: 'max', icon: <IconUser />, color: 'blue'}} />
      <Message side='right' message='test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test ' author={{name: 'max', icon: <IconUser />, color: 'blue'}} />
      <MessageInput />
    </>
  )
}
