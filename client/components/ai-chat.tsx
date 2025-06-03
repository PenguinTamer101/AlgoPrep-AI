// components/ai-chat.tsx
"use client"

import { useState, useEffect, useImperativeHandle, forwardRef } from "react"

interface Message {
  role: "assistant"
  content: string
  id: string
}

export interface AiChatRef {
  addMessage: (message: Message) => void
}

const AiChat = forwardRef<AiChatRef>((_, ref) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isClient, setIsClient] = useState(false)

  // Expose methods to parent components
  useImperativeHandle(ref, () => ({
    addMessage: (message: Message) => {
      setMessages(prev => [...prev, message])
    }
  }))

  // Initialize component after mounting
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Return a loading state or nothing until client-side rendering takes over
  if (!isClient) {
    return (
      <div className="flex flex-col h-full bg-muted/30">
        <div className="border-b p-3 text-lg font-semibold">
          AI Assistant
        </div>
        <div className="flex-1 p-4">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-muted/30">
      <div className="border-b p-3 text-lg font-semibold">
        AI Assistant
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className="mb-4 max-w-[80%]"
          >
            <div className="p-3 rounded-lg bg-muted">
              {message.content}
            </div>
            <div className="text-xs text-muted-foreground mt-1 px-1">
              Assistant
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-8">
            Click the Hint button to get help with this problem
          </div>
        )}
      </div>
    </div>
  )
})

AiChat.displayName = "AiChat"

export default AiChat