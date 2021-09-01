export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SIP.shop',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'apple-touch-icon', size:'57x57', href: '/apple-icon-57x57.png'},
      {rel: 'apple-touch-icon', size:'60x60', href: '/apple-icon-60x60.png'},
      {rel: 'apple-touch-icon', size:'72x72', href: '/apple-icon-72x72.png'},
      {rel: 'apple-touch-icon', size:'76x76', href: '/apple-icon-76x76.png'},
      {rel: 'apple-touch-icon', size:'114x114', href: '/apple-icon-114x114.png'},
      {rel: 'apple-touch-icon', size:'120x120', href: '/apple-icon-120x120.png'},
      {rel: 'apple-touch-icon', size:'144x144', href: '/apple-icon-144x144.png'},
      {rel: 'apple-touch-icon', size:'152x15', href: '/apple-icon-152x15.png'},
      {rel: 'apple-touch-icon', size:'180x180', href: '/apple-icon-180x180.png'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/styles.ts'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    'nuxt-buefy',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.AXIOS_BASE_URL || 'https://pdw-shop-backend.herokuapp.com/'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'de',
      name: 'shop',
      "icons": [
        {
          "src": "/android-icon-36x36.png",
          "sizes": "36x36",
          "type": "image/png",
          "density": "0.75"
        },
        {
          "src": "/android-icon-48x48.png",
          "sizes": "48x48",
          "type": "image/png",
          "density": "1.0"
        },
        {
          "src": "/android-icon-72x72.png",
          "sizes": "72x72",
          "type": "image/png",
          "density": "1.5"
        },
        {
          "src": "/android-icon-96x96.png",
          "sizes": "96x96",
          "type": "image/png",
          "density": "2.0"
        },
        {
          "src": "/android-icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png",
          "density": "3.0"
        },
        {
          "src": "/android-icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "density": "4.0"
        }
      ]
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  auth: {
    redirect: {
      home: false,
    },
    strategies: {
      local: {
        token: {
          property: 'token',
        },
        user: {
          property: false,
        },
        endpoints: {
          login: {url: '/api/auth/login', method: 'post'},
          logout: {url: '/api/auth/logout', method: 'post'},
          user: {url: '/api/auth/user', method: 'get'}
        }
      },
    },
  },

  toast: {
    position: 'top-center',
    register: [
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  }
}
