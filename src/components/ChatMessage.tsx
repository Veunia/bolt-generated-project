interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp: Date
  isTyping?: boolean
}

export function ChatMessage({ message, isUser, timestamp, isTyping }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] p-4 rounded-lg ${
        isUser ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-gray-800'
      }`}>
        <p className="text-gray-100">
          {message}
          {isTyping && (
            <span className="ml-2 inline-block w-2 h-2 bg-gray-400 rounded-full animate-blink" />
          )}
        </p>
        <div className="text-xs text-gray-400 mt-1">
          {timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}
