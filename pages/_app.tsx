import NavbarNested from '@/components/navbar'
import '@/styles/globals.css'
import { AppShell, Burger, Code, Flex, Group, Header, Image, MantineProvider, MediaQuery, ScrollArea, Text, useMantineTheme } from '@mantine/core'
import type { AppProps } from 'next/app'
import useSWR from 'swr'
import { ModalsProvider } from '@mantine/modals'
import Head from 'next/head'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Head>
        <link rel='icon' href={process.env.NEXT_PUBLIC_LOGO_URL} />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS withCSSVariables theme={{ colorScheme: 'dark' }}>
        <ModalsProvider>
          <AppShell navbar={<NavbarNested opened={opened} />} header={
            <Header height={{ base: 50, md: 70 }} p="md">
              <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Burger
                    opened={!opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>

                <Group position='center' dir='row' w={'100%'}>
                  <Image src={process.env.NEXT_PUBLIC_LOGO_URL as string} alt={process.env.NEXT_PUBLIC_SERVICE_NAME + ' Logo'} height={30} maw={199} fit={'contain'} withPlaceholder bgp={'left'} />
                </Group>
                  <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>

              </div>
            </Header>
          }>
            <Component {...pageProps} />
          </AppShell>
        </ModalsProvider>
      </MantineProvider>
    </>
  )
}
