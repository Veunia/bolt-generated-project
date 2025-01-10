import { useState, useCallback } from 'react'
import { streamChatCompletion } from '../api/chatService'
import { Message } from '../types'

export function useChatStream() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamError, setStreamError] = useState<string | null>(null)

  const startStream = useCallback(async (
    messages: Message[],
    model: string,
    apiKey: string,
    onNewMessage: (message: Message) => void
  ) => {
    setIsStreaming(true)
    setStreamError(null)

    let aiMessage: Message = {
      id: Date.now().toString(),
      text: '',
      isUser: false,
      timestamp: new Date()
    }

    await streamChatCompletion({
      messages,
      model,
      apiKey,
      onData: (chunk) => {
        aiMessage.text += chunk
        onNewMessage({ ...aiMessage })
      },
      onComplete: () => {
        setIsStreaming(false)
      },
      onError: (error) => {
        setIsStreaming(false)
        setStreamError(error.message)
      }
    })
  }, [])

  return { isStreaming, streamError, startStream }
}
