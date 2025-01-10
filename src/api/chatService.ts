import { Message } from '../types'

interface ChatCompletionParams {
  messages: Message[]
  model: string
  apiKey: string
  onData: (chunk: string) => void
  onComplete: () => void
  onError: (error: Error) => void
}

export async function streamChatCompletion({
  messages,
  model,
  apiKey,
  onData,
  onComplete,
  onError
}: ChatCompletionParams) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: messages.map(m => ({ role: m.isUser ? 'user' : 'assistant', content: m.text })),
        stream: true
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error('No reader available')
    }

    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        onComplete()
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const json = line.slice(6)
          if (json === '[DONE]') {
            onComplete()
            return
          }

          try {
            const data = JSON.parse(json)
            const chunk = data.choices[0]?.delta?.content || ''
            if (chunk) {
              onData(chunk)
            }
          } catch (error) {
            console.error('Error parsing chunk:', error)
          }
        }
      }
    }
  } catch (error) {
    onError(error instanceof Error ? error : new Error('An error occurred'))
  }
}
