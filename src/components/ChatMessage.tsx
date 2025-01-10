import { LucideIcon } from 'lucide-react'
import { Bot, User as UserIcon } from 'lucide-react'

interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp: Date
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] p-4 rounded-lg flex items-start gap-3 ${
        isUser ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-gray-800'
      }`}>
        <div className="pt-1">
          {isUser ? (
            <UserIcon className="w-5 h-5 text-cyan-500" />
          ) : (
            <Bot className="w-5 h-5 text-gray-400" />
          )}
        </div>
        <div>
          <p className="text-gray-100">{message}</p>
          <div className="text-xs text-gray-400 mt-1">
            {timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  )
}
