export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  app: {
    head: {
      title: 'Kontext SDK JS + Vue Demo',
      script: [
        {
          src: 'https://server.kontext.so/sdk/js?type=global&publisherToken=polybuzz-dev',
          defer: true,
        },
      ],
    },
  },
})
