// components/ai-chat.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  role: "user" | "assistant"
  content: string
  id: string // Use a stable ID instead of time
}

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isClient, setIsClient] = useState(false)

  // Initialize messages after component is mounted (client-side only)
  useEffect(() => {
    setIsClient(true)
    setMessages([
      {
        role: "assistant",
        content: "Hi there! I'm your coding assistant. How can I help you with this problem?",
        id: "initial-message"
      }
    ])
  }, [])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      id: `user-${Date.now()}`
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput("")
    
    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: "This is a placeholder response. In the future, I'll be connected to an AI API to provide real coding help!",
        id: `assistant-${Date.now()}`
      }
      setMessages(prev => [...prev, assistantMessage])
    }, 1000)
  }

  // Return a loading state or nothing until client-side rendering takes over
  if (!isClient) {
    return (
      <div className="flex flex-col h-full bg-muted/30">
        <div className="border-b p-3 text-lg font-semibold">
          AI Coding Assistant
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
        <div className="p-3 border-t bg-background">
          <div className="flex gap-2">
            <div className="w-full h-10 bg-slate-200 rounded"></div>
            <div className="w-20 h-10 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-muted/30">
      <div className="border-b p-3 text-lg font-semibold">
        AI Coding Assistant
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-4 max-w-[80%] ${message.role === "user" ? "ml-auto" : ""}`}
          >
            <div 
              className={`p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {message.content}
            </div>
            <div className="text-xs text-muted-foreground mt-1 px-1">
              {message.role === "user" ? "You" : "Assistant"}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t bg-background">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for help with this problem..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          AI is not yet connected. This is a placeholder interface.
        </p>
      </div>
    </div>
  )
}