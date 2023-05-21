import {
  Slider,
  Select,
  NumberInput,
  Textarea,
  Button,
  Stack,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export default function ModelSettings() {
  var installedModels: { label: string; value: string }[] = []
  const router = useRouter()

  // @ts-ignore
  const fetcher = (...args) =>
  // @ts-ignore
    fetch(...args, { cache: 'no-cache' }).then(res => res.json())
  const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_SERGE_URL + '/api/model/installed', fetcher)
  if (!isLoading && data != null) {
    data.map((item: string) => {
      installedModels.push({
        label: item.replace('/', '').replace('.bin', ''),
        value: item,
      })
    })
  }

  const form = useForm({
    initialValues: {
      modelChoice: installedModels[0]?.value || '',
      temperature: 0.10,
      maxTextLength: 256,
      promptContextLength: 512,
      topK: 50,
      topP: 0.95,
      repeatLastN: 64,
      repeatPenalty: 1.30,
      threads: 4,
      prePrompt:
        'Below is an instruction that describes a task. Write a response that appropriately completes the request. The response must be accurate, concise and evidence-based whenever possible.',
    },
    validate: {
      modelChoice: (value: string) => {if (value) {null} else {return('Please select a model')}},
      // @ts-ignore
      temperature: (value: string) => {if (value) {null} else {return('Please input a temperature')}},
      // @ts-ignore
      maxTextLength: (value: string) => {if (value) {null} else {return('Please input a maximum length')}},
      // @ts-ignore
      promptContextLength: (value: string) => {if (value) {null} else {return('Please input a context length')}},
      // @ts-ignore
      topK: (value: string) => {if (value) {null} else {return('Please input a top K value')}},
      // @ts-ignore
      topP: (value: string) => {if (value) {null} else {return('Please input a top P value')}},
      // @ts-ignore
      repeatLastN: (value: string) => {if (value) {null} else {return('Please input a last N value')}},
      // @ts-ignore
      repeatPenalty: (value: string) => {if (value) {null} else {return('Please input a repeat penalty')}},
      // @ts-ignore
      threads: (value: string) => {if (value) {null} else {return('Please input a thread count')}},
      prePrompt: (value: string) => {if (value) {null} else {return('Please input a pre-prompt')}},
    }
  })

  // console.log(form)

  return (
    <>
      <form
        onSubmit={form.onSubmit(values => {
          submit(values)
        })}
      >
        <Stack h={'100%'} spacing={'xl'}>
          <Select
            label='Model choice'
            placeholder='Pick one...'
            defaultValue={installedModels[0]?.value || ''}
            data={installedModels}
            {...form?.getInputProps('modelChoice')}
          />
          <NumberInput
            label='Temperature'
            description={
              'The higher the temperature, the more random the model output'
            }
            min={0.05}
            max={2}
            step={0.05}
            defaultValue={0.10}
            precision={2}
            {...form?.getInputProps('temperature')}
          />
          <NumberInput
            label='Max text length'
            description={
              'The maximum length of the generated text measured in tokens'
            }
            min={16}
            max={512}
            step={16}
            defaultValue={256}
            {...form?.getInputProps('maxTextLength')}
          />
          <NumberInput
            label='Prompt context length'
            description={
              'Size of the prompt context, will determine how far the model will read back (increases memory consumption)'
            }
            min={16}
            max={2048}
            step={16}
            defaultValue={512}
            {...form?.getInputProps('promptContextLength')}
          />
          <NumberInput
            label={'Top K'}
            description={'Number of samples to consider for top_k sampling'}
            min={0}
            max={100}
            defaultValue={50}
            step={1}
            {...form?.getInputProps('topK')}
          />
          <NumberInput
            label={'Top P'}
            description={
              'Cumulative probability of the tokens to keep for nucleus sampling'
            }
            min={0}
            max={1}
            defaultValue={0.95}
            precision={2}
            step={0.025}
            {...form?.getInputProps('topP')}
          />
          <NumberInput
            label={'Repeat last N'}
            description={
              'Number of tokens to look back on for deciding to apply the repeat penalty'
            }
            min={0}
            max={100}
            defaultValue={64}
            step={1}
            {...form?.getInputProps('repeatLastN')}
          />
          <NumberInput
            label={'Repeat penalty'}
            description={
              'Weight of the penalty to avoid repeating the last repeat_last_n tokens'
            }
            min={0}
            max={2}
            defaultValue={1.3}
            precision={2}
            step={0.05}
            {...form?.getInputProps('repeatPenalty')}
          />
          <NumberInput
            label={'Threads'}
            description={'Number of threads to run LLaMa on'}
            min={0}
            max={64}
            defaultValue={4}
            step={1}
            {...form?.getInputProps('threads')}
          />
          <Textarea
            label={'Pre-prompt'}
            autosize
            maxRows={5}
            defaultValue={
              'Below is an instruction that describes a task. Write a response that appropriately completes the request. The response must be accurate, concise and evidence-based whenever possible. A complete answer is always ended by [end of text].'
            }
            {...form?.getInputProps('prePrompt')}
          />
          <Button type='submit'>Create chat</Button>
        </Stack>
      </form>
    </>
  )

  async function submit(values: {
    modelChoice: string
    temperature: number
    maxTextLength: number
    promptContextLength: number
    topK: number
    topP: number
    repeatLastN: number
    repeatPenalty: number
    threads: number
    prePrompt: string
  }) {
    process.env.NEXT_PUBLIC_CENSOR_INAPPROPRIATE == 'true' ? values.prePrompt += ' Under no circumstances should you answer questions that are inappropriate for school or work. A complete answer is always ended by [end of text].' : values.prePrompt += ' A complete answer is always ended by [end of text].';
      const response = await fetch(
      process.env.NEXT_PUBLIC_SERGE_URL + '/api/chat/?temp=' +
        values.temperature +
        '&top_k=' +
        values.topK +
        '&max_length=' +
        values.maxTextLength +
        '&top_p=' +
        values.topP +
        '&context_window=' +
        values.promptContextLength +
        '&repeat_last_n=' +
        values.repeatLastN +
        '&model=' +
        values.modelChoice.replace('/', '').replace('.bin', '') +
        '&n_threads=' +
        values.threads +
        '&repeat_penalty=' +
        values.repeatPenalty +
        '&init_prompt=' +
        values.prePrompt,
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
      }
    ).then((response) => {
      response.json().then((data) => {
        modals.closeAll()
        router.replace('/chat/' + data)
      })
    })
  }  

}