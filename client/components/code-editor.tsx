// components/code-editor.tsx
"use client"

import { useState, useEffect } from "react"
import CodeEditorTextarea from "@uiw/react-textarea-code-editor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface CodeEditorProps {
  language: string
  code: string
  onChange?: (code: string) => void
  onLanguageChange?: (language: string) => void
  showLineNumbers?: boolean
  onHintRequest?: () => void
}

export default function CodeEditor({ 
  language, 
  code: initialCode, 
  onChange,
  onLanguageChange,
  showLineNumbers = false,
  onHintRequest
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [isLoadingHint, setIsLoadingHint] = useState(false)

  useEffect(() => {
    setCode(initialCode)
  }, [initialCode, language])

  const handleChange = (value: string) => {
    setCode(value)
    if (onChange) {
      onChange(value)
    }
  }

  const handleLanguageChange = (newLanguage: string) => {
    if (onLanguageChange) {
      onLanguageChange(newLanguage)
    }
  }

  const handleHintRequest = async () => {
    if (isLoadingHint) return
    setIsLoadingHint(true)
    try {
      await onHintRequest?.()
    } finally {
      setIsLoadingHint(false)
    }
  }

  // Count the number of lines in the code
  const lineCount = code.split("\n").length
  
  return (
    <div className="h-full flex flex-col border border-border rounded-md overflow-hidden bg-zinc-50 dark:bg-zinc-800 shadow-md">
      <div className="flex items-center justify-between bg-white dark:bg-zinc-800 border-b border-border p-2 px-4">
        <div className="flex items-center space-x-2">
          <Select 
            value={language} 
            onValueChange={handleLanguageChange}
          >
            <SelectTrigger className="w-32 h-8 bg-white dark:bg-zinc-700">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="java">Java</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" className="bg-white dark:bg-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-600">Run</Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">Submit</Button>
        </div>
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleHintRequest}
          disabled={isLoadingHint}
          className="bg-white dark:bg-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-600"
        >
          {isLoadingHint ? "Loading..." : "Hint"}
        </Button>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Line Numbers Column */}
        {showLineNumbers && (
          <div 
            className="w-8 bg-zinc-900 border-r border-zinc-700 py-4 text-right pr-2 flex-shrink-0 text-zinc-400 select-none overflow-y-auto"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px" }}
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i} className="leading-[1.5]">
                {i + 1}
              </div>
            ))}
          </div>
        )}
        
        {/* Code Editor Area */}
        <div className="flex-1 overflow-auto">
          <CodeEditorTextarea
            value={code}
            language={language}
            placeholder="Write your code here"
            onChange={(e) => handleChange(e.target.value)}
            padding={15}
            style={{
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              backgroundColor: "#18181b",
              minHeight: "100%",
              width: "100%",
              borderRadius: 0,
            }}
            className="min-h-full w-full"
            data-color-mode="dark"
          />
        </div>
      </div>
    </div>
  )
}