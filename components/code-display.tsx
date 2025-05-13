// components/code-display.tsx - Fixed version
"use client"

import React from "react"
import { Highlight, themes } from "prism-react-renderer"

const pythonCode = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Create a hash map to store values and their indices
        num_map = {}
        
        # Iterate through the array
        for i, num in enumerate(nums):
            # Calculate the complement needed to reach target
            complement = target - num
            
            # Check if the complement exists in our map
            if complement in num_map:
                # Return indices of the two numbers
                return [num_map[complement], i]
            
            # Add current number and index to the map
            num_map[num] = i
        
        # No solution found
        return []

# Example usage:
# Input: nums = [2, 7, 11, 15], target = 9
# Output: [0, 1]`

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