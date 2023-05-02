import NavbarNested from '@/components/navbar'
import '@/styles/globals.css'
import { AppShell, Flex, MantineProvider, ScrollArea } from '@mantine/core'
import type { AppProps } from 'next/app'
import useSWR from 'swr'
import { ModalsProvider } from '@mantine/modals'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <link rel='icon' href={process.env.NEXT_PUBLIC_LOGO_URL} />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS withCSSVariables theme={{ colorScheme: 'dark' }}>
        <ModalsProvider>
          <AppShell navbar={<NavbarNested />}>
            <Component {...pageProps} />
          </AppShell>
        </ModalsProvider>
      </MantineProvider>
    </>
  )
}
