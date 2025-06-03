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

  // Count the number of lines in the code
  const lineCount = code.split("\n").length
  
  return (
    <div className="h-full flex flex-col border border-border rounded-md overflow-hidden bg-white dark:bg-zinc-800 shadow-md">
      <div className="flex items-center justify-between bg-gray-50 dark:bg-zinc-700/50 border-b border-border p-2 px-4">
        <div className="flex items-center space-x-2">
          <Select 
            value={language} 
            onValueChange={handleLanguageChange}
          >
            <SelectTrigger className="w-32 h-8">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="java">Java</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline">Run</Button>
          <Button size="sm">Submit</Button>
        </div>
        <Button 
          size="sm" 
          variant="secondary"
          onClick={onHintRequest}
        >
          Hint
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
              backgroundColor: "#1e1e1e",
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