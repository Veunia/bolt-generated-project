import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface Model {
  id: string
  name: string
  icon: string
}

export function ModelSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState<Model>({
    id: 'gpt-4',
    name: 'GPT-4',
    icon: '🤖'
  })

  const models: Model[] = [
    { id: 'gpt-4', name: 'GPT-4', icon: '🤖' },
    { id: 'claude-3', name: 'Claude 3', icon: '🧠' },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <span>{selectedModel.icon}</span>
        <span>{selectedModel.name}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-gray-800 rounded-lg shadow-lg z-10">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => {
                setSelectedModel(model)
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              <span>{model.icon}</span>
              <span>{model.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
