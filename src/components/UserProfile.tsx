import { useState } from 'react'
import { User, Settings, LogOut } from 'lucide-react'

export function UserProfile() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  })

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative"
      >
        <User size={24} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-lg shadow-lg z-50 border border-gray-800">
          {/* Profile Header */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium text-gray-100">{user.name}</div>
                <div className="text-sm text-gray-400">{user.email}</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
              <Settings size={18} />
              <span>Settings</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
