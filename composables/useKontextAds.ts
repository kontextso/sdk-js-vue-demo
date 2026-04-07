declare global {
  interface Window {
    KontextSdk: {
      KontextAds: () => {
        createSession: (config: SessionConfig) => Session
      }
    }
  }
}

interface SessionConfig {
  publisherToken: string
  userId: string
  conversationId: string
  onEvent?: (event: { name: string; code: string; payload: unknown }) => void
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: Date
}

interface Session {
  addMessage: (message: Message) => void
  render: (options: { messageId: string; element: HTMLElement }) => void
}

let session: Session | null = null

export function useKontextAds() {
  function createSession(config: SessionConfig): Session {
    const { KontextAds } = window.KontextSdk
    const ads = KontextAds()
    session = ads.createSession(config)
    return session
  }

  function getSession(): Session | null {
    return session
  }

  return { createSession, getSession }
}
