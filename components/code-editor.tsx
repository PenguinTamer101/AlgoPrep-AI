// components/code-editor.tsx
"use client"

import { useState, useEffect } from "react"
import CodeEditorTextarea from "@uiw/react-textarea-code-editor"

interface CodeEditorProps {
  language: string
  code: string
  onChange?: (code: string) => void
}

export default function CodeEditor({ language, code: initialCode, onChange }: CodeEditorProps) {
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

  return (
    <div className="h-full">
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 text-xs text-gray-400 flex items-center">
        <div className="flex items-center gap-1.5 mr-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="font-medium">
          {language === "python" ? "solution.py" : 
           language === "javascript" ? "solution.js" : 
           language === "java" ? "Solution.java" : "solution.txt"}
        </span>
      </div>
      <CodeEditorTextarea
        value={code}
        language={language}
        placeholder="Write your code here"
        onChange={(e) => handleChange(e.target.value)}
        padding={15}
        style={{
          fontSize: 14,
          backgroundColor: "#1e1e1e",
          fontFamily: "'Fira Code', monospace",
          height: "calc(100% - 36px)",
          borderRadius: 0,
          overflow: "auto"
        }}
        className="min-h-full"
      />
    </div>
  )
}