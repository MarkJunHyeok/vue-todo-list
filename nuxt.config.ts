// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: [
    {
      path: '~/components',
    }
  ],
  app: {
    head: {
      title: 'Vue Todo List',
      meta: [{name: 'description', content: 'Nuxt 3 fore beginners'}],
    },
    pageTransition: {name: 'page', mode: 'out-in'}
  },
  css: [ './assets/css/common.css' ],
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      envName: process.env.ENV_NAME,
      axiosHost: process.env.AXIOS_HOST,
      oauthHost: process.env.OAUTH_HOST
    },
  },
})
