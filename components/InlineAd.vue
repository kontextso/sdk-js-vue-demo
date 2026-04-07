<script setup lang="ts">
const props = defineProps<{
  messageId: string
}>()

const adRef = ref<HTMLElement | null>(null)
const rendered = ref(false)
const { getSession } = useKontextAds()

watch(
  () => props.messageId,
  () => {
    rendered.value = false
  },
)

onMounted(() => {
  renderAd()
})

function renderAd() {
  if (rendered.value || !adRef.value) return
  const session = getSession()
  if (!session) return

  session.render({
    messageId: props.messageId,
    element: adRef.value,
  })
  rendered.value = true
}

watch(adRef, () => renderAd())
</script>

<template>
  <div ref="adRef" class="ad-container" />
</template>

<style scoped>
.ad-container {
  margin-top: 8px;
}
</style>
