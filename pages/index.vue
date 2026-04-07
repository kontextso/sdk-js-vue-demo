<script setup lang="ts">
const PUBLISHER_TOKEN = 'polybuzz-dev'
const PLACEMENT_CODE = 'inlineAd'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: Date
}

const messages = ref<Message[]>([])
const input = ref('')
const isLoading = ref(false)
const sdkReady = ref(false)

const { createSession, getSession } = useKontextAds()

const conversationId = 'conversation-123'
const userId = 'user-123'

function getRandomId() {
  return Date.now() + Math.random().toString(36).substring(2, 15)
}

onMounted(() => {
  // Wait for the SDK script to load
  const check = setInterval(() => {
    if (window.KontextSdk) {
      clearInterval(check)
      createSession({
        publisherToken: PUBLISHER_TOKEN,
        userId,
        conversationId,
        onEvent: (event) => {
          console.log('Ad event:', event.name, event.code, event.payload)
        },
      })
      sdkReady.value = true
    }
  }, 100)
})

function sendMessage() {
  const content = input.value.trim()
  if (!content || isLoading.value) return

  const session = getSession()
  if (!session) return

  input.value = ''

  // Add user message
  const userMessage: Message = {
    id: getRandomId(),
    role: 'user',
    content,
    createdAt: new Date(),
  }
  messages.value.push(userMessage)
  session.addMessage(userMessage)

  // Simulate assistant response
  isLoading.value = true
  setTimeout(() => {
    const assistantMessage: Message = {
      id: getRandomId(),
      role: 'assistant',
      content: 'This is a simulated response from the assistant.',
      createdAt: new Date(),
    }
    messages.value.push(assistantMessage)
    session.addMessage(assistantMessage)
    isLoading.value = false
  }, 1500)
}
</script>

<template>
  <div class="container">
    <h1>Kontext SDK JS + Vue/Nuxt Demo</h1>

    <div v-if="!sdkReady" class="loading">Loading SDK...</div>

    <template v-else>
      <div class="chat">
        <div v-for="message in messages" :key="message.id" class="message">
          <div class="message-role">{{ message.role }}</div>
          <div class="message-content">{{ message.content }}</div>
          <InlineAd
            v-if="message.role === 'assistant'"
            :message-id="message.id"
          />
        </div>

        <div v-if="isLoading" class="loading">Assistant is typing...</div>
      </div>

      <form class="form" @submit.prevent="sendMessage">
        <textarea
          v-model="input"
          :disabled="isLoading"
          placeholder="Type your message..."
          rows="3"
          @keydown.enter.exact.prevent="sendMessage"
        />
        <button type="submit" :disabled="isLoading || !input.trim()">
          Send
        </button>
      </form>
    </template>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
  color: #333;
}

.container {
  max-width: 680px;
  margin: 0 auto;
  padding: 24px 16px;
}

h1 {
  font-size: 1.4rem;
  margin-bottom: 20px;
}

.chat {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.message {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
}

.message-role {
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: capitalize;
  margin-bottom: 4px;
  color: #666;
}

.message-content {
  line-height: 1.5;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.95rem;
  resize: vertical;
}

button {
  align-self: flex-start;
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  background: #007bff;
  color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading {
  padding: 12px;
  color: #888;
  font-style: italic;
}
</style>
