export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  app: {
    head: {
      title: 'Kontext SDK JS + Vue Demo',
      script: [
        {
          src: 'https://server.megabrain.co/sdk/js?type=global&publisherToken=polybuzz-dev',
          defer: true,
        },
      ],
    },
  },
})
