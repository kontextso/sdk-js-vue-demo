# Kontext SDK JS — Vue / Nuxt Demo

Demo app showing how to integrate [Kontext JS SDK](https://docs.kontext.so/sdk/js) with Vue 3 and Nuxt.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How it works

- The SDK is loaded via `<script>` tag in `nuxt.config.ts`
- `composables/useKontextAds.ts` wraps the global `KontextSdk` in a Vue composable
- `components/InlineAd.vue` renders an ad for a given message ID using `session.render()`
- `pages/index.vue` is a simple chat UI that creates a session, sends messages, and shows inline ads after assistant responses

## Configuration

Edit `pages/index.vue` to change `PUBLISHER_TOKEN` and `PLACEMENT_CODE`.
