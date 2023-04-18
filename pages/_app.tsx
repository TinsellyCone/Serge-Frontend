import NavbarNested from '@/components/navbar'
import '@/styles/globals.css'
import { AppShell, Flex, MantineProvider, ScrollArea } from '@mantine/core'
import type { AppProps } from 'next/app'
import useSWR from 'swr'
import { ModalsProvider } from '@mantine/modals'

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS withCSSVariables theme={{colorScheme: 'dark'}}>
      <ModalsProvider>
        <AppShell navbar={<NavbarNested />}>
          {/* <Flex direction={'row'}> */}
            {/* <NavbarNested /> */}
            {/* <div style={{height: '100vh', width: 'var(--mantine-navbar-width)', minWidth: 'var(--mantine-navbar-width)', padding: '16px'}} />  This is a placeholder for the navbar to displace the rest of the content accordingly */}
              <Component {...pageProps} />
          {/* </Flex> */}
        </AppShell>
      </ModalsProvider>
    </MantineProvider>
  )
}
