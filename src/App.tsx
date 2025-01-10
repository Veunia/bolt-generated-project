import { useState } from 'react'
import { Settings, MessageSquare, Plus, Key, User } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { ChatMessage } from './components/ChatMessage'
import { UserProfile } from './components/UserProfile'
import { ModelSelector } from './components/ModelSelector'
import { useChatStream } from './hooks/useChatStream'
import { Chat, Message } from './types'

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState('')
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const { isStreaming, streamError, startStream } = useChatStream()

  const activeChat = chats.find(chat => chat.id === activeChatId)
  const messages = activeChat?.messages || []

  const handleNewChat = () => {
    const newChat: Chat = {
      id: uuidv4(),
      title: `Chat ${chats.length + 1}`,
      messages: [],
      createdAt: new Date()
    }
    setChats([newChat, ...chats])
    setActiveChatId(newChat.id)
  }

  const handleSendMessage = async (message: string) => {
    if (!activeChatId || !apiKey) return

    const userMessage: Message = {
      id: uuidv4(),
      text: message,
      isUser: true,
      timestamp: new Date()
    }

    setChats(prevChats => prevChats.map(chat => 
      chat.id === activeChatId
        ? { ...chat, messages: [...chat.messages, userMessage] }
        : chat
    ))

    await startStream(
      [...messages, userMessage],
      selectedModel,
      apiKey,
      (aiMessage) => {
        setChats(prevChats => prevChats.map(chat => 
          chat.id === activeChatId
            ? { 
                ...chat, 
                messages: chat.messages.some(m => m.id === aiMessage.id)
                  ? chat.messages.map(m => m.id === aiMessage.id ? aiMessage : m)
                  : [...chat.messages, aiMessage]
              }
            : chat
        ))
      }
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex">
      {/* ... (rest of the JSX) */}
    </div>
  )
}

export default App
