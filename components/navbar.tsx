import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  rem,
} from '@mantine/core'
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconRobot,
  IconMessageChatbot,
  IconMessage,
  IconHome,
  IconMessages,
} from '@tabler/icons-react'
import { UserButton } from './userButton'
import { LinksGroup } from './navbarLinksGroup'
import useSWR from 'swr'
import { useEffect } from 'react'
import Image from 'next/image'
// import { Logo } from './Logo';

const navdata = [
  { label: 'Home', icon: IconHome, link: '/' },
  {
    label: 'Chats',
    icon: IconMessages,
    initiallyOpened: true,
    links: [
      { label: '', link: '' },
    ],
  },
  { label: 'Settings', icon: IconAdjustments, link: '/settings' },
]

const useStyles = createStyles(theme => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}))

export default function NavbarNested() {
  const { classes } = useStyles()
  
  var tempLinks: any[] = []

  // @ts-ignore
  const fetcher = (...args) => fetch(...args, {cache: 'no-cache'}).then(res => res.json())
  const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_SERGE_URL + '/api/chat/', fetcher, { refreshInterval: 1000 })
  if (!isLoading && data != null) {
    data.map((item: { subtitle: string; id: string, model: string }) => {
      tempLinks.push({
        label: item.subtitle || item.model,
        link: `/chat/${item.id}`,
      })
    })
    // @ts-ignore
    navdata[1].links = tempLinks
  }

  const links = navdata.map(item => <LinksGroup {...item} key={item.label} />)


  return (
    <Navbar
      height={'100vh'}
      width={{ sm: 300 }}
      p='md'
      className={classes.navbar}
      style={{ position: 'fixed' }}
    >
      <Navbar.Section className={classes.header}>
        <Group position='apart'>
          <Image src={process.env.NEXT_PUBLIC_LOGO_URL as string} alt={process.env.NEXT_PUBLIC_SERVICE_NAME + ' Logo'} />
          {/* <Logo width={rem(120)} /> */}
          <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      {/* <Navbar.Section className={classes.footer}>
        <UserButton
          image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
          name="John Doe"
          email="JohnDoe@example.com"
        />
      </Navbar.Section> */}
    </Navbar>
  )
}
