import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from '@mantine/core'
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons-react'
import {
  useHotkeys,
  useFocusTrap,
  useFocusWithin,
  useMergedRef,
} from '@mantine/hooks'
import { useForm } from '@mantine/form'

export function MessageInput({
  submit,
}: {
  submit: (message: string) => void
}) {
  const theme = useMantineTheme()

  const form = useForm({
    initialValues: {
      message: '',
    },
  })

  const focusTrapRef = useFocusTrap()

  return (
    <form
      onSubmit={form.onSubmit(values => {
        form.reset()
        submit(values.message)
      })}
      style={{ position: 'fixed', bottom: '10px', left: '50%', width: '100%', transform: 'translate(-50%,-50%)' }}
      autoComplete='off'
    >
      <TextInput
        w={'calc(100% - 12.5rem)'}
        maw={700}
        ref={focusTrapRef}
        radius='xl'
        size='md'
        style={{ margin: '0 auto' }}
        autoComplete='off'
        rightSection={
          <ActionIcon
            size={32}
            radius='xl'
            color={theme.primaryColor}
            variant='filled'
            type='submit'
          >
            {theme.dir === 'ltr' ? (
              <IconArrowRight size='1.1rem' stroke={1.5} />
            ) : (
              <IconArrowLeft size='1.1rem' stroke={1.5} />
            )}
          </ActionIcon>
        }
        placeholder='Send a message...'
        rightSectionWidth={42}
        {...form.getInputProps('message')}
      />
    </form>
  )
}

function sendMessage(message?: string) {
  if (!message) message = 'test'
  console.log(message)
}
