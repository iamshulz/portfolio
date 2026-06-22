export default defineAppConfig({
  global: {
    picture: {
      dark: '/prof-pic.png',
      light: '/img_prof3.png',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/',
    email: 'oliver@maglana.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Built with Nuxt • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/iamshulz',
      'target': '_blank',
      'aria-label': 'Nuxt UI on GitHub'
    }]
  }
})
