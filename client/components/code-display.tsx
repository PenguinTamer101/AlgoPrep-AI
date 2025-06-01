// components/code-display.tsx
"use client"

import React from "react"
import { Highlight, themes } from "prism-react-renderer"

const pythonCode = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        num_map = {}
        
        for i, num in enumerate(nums):
            complement = target - num
            
            if complement in num_map:
                return [num_map[complement], i]
            
            num_map[num] = i
        
        return []
        `

interface CodeDisplayProps {
  className?: string
}

export function CodeDisplay({ className }: CodeDisplayProps) {
  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-2 text-sm text-gray-400 font-medium">two_sum.py</div>
      </div>
      <Highlight
        theme={themes.nightOwl}
        code={pythonCode}
        language="python"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} p-4 overflow-auto`} style={{ ...style, backgroundColor: '#011627' }}>
            {tokens.map((line, lineIndex) => {
              // Extract line props without the key
              const { key: lineKey, ...lineProps } = getLineProps({ line, key: lineIndex });
              
              return (
                <div key={lineIndex} {...lineProps}>
                  <span className="text-gray-500 mr-4 inline-block w-8 text-right select-none">
                    {lineIndex + 1}
                  </span>
                  {line.map((token, tokenIndex) => {
                    // Extract token props without the key
                    const { key: tokenKey, ...tokenProps } = getTokenProps({ token, key: tokenIndex });
                    
                    return <span key={tokenIndex} {...tokenProps} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  )
}