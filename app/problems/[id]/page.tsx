"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import CodeEditor from "@/components/code-editor"
import AiChat from "@/components/ai-chat"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"

export default function ProblemPage() {
  const [language, setLanguage] = useState("python")
  const params = useParams()
  const id = params.id as string
  
  // Sample problem data - would normally be fetched based on id
  const problem = {
    id: id,
    title: "Two Sum",
    difficulty: "Easy",
    description: `<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>
                  <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the <em>same</em> element twice.</p>
                  <p>You can return the answer in any order.</p>`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ]
  }

  // Sample starter code based on language
  const getStarterCode = (lang: string) => {
    switch (lang) {
      case "python":
        return `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass`;
      case "javascript":
        return `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your code here
};`;
      case "java":
        return `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{0, 0};
    }
}`;
      default:
        return "// Start coding here";
    }
  }

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Problem Header */}
        <div className="border-b px-6 py-3 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">{problem.title}</h1>
            <p className="text-muted-foreground text-sm">
              Problem #{id} • {problem.difficulty}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select 
              value={language} 
              onValueChange={setLanguage}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>
            <Button>Run Code</Button>
            <Button variant="outline">Submit</Button>
          </div>
        </div>

        {/* Resizable Panels */}
        <div className="flex-1 overflow-hidden">
          <PanelGroup direction="horizontal">
            {/* Problem Description & Code Editor Panel */}
            <Panel defaultSize={60} minSize={30}>
              <div className="h-full flex flex-col">
                <div className="p-6 overflow-y-auto h-1/3 border-b">
                  <div dangerouslySetInnerHTML={{ __html: problem.description }} className="prose max-w-none mb-6" />
                  <h3 className="font-semibold mb-2">Examples:</h3>
                  {problem.examples.map((example, index) => (
                    <div key={index} className="mb-4 bg-muted p-3 rounded">
                      <div className="mb-1"><span className="font-medium">Input:</span> {example.input}</div>
                      <div className="mb-1"><span className="font-medium">Output:</span> {example.output}</div>
                      {example.explanation && (
                        <div><span className="font-medium">Explanation:</span> {example.explanation}</div>
                      )}
                    </div>
                  ))}
                  <h3 className="font-semibold mb-2">Constraints:</h3>
                  <ul className="list-disc pl-5">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index} className="mb-1">{constraint}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <CodeEditor 
                    language={language}
                    code={getStarterCode(language)}
                  />
                </div>
              </div>
            </Panel>
            
            <PanelResizeHandle className="w-1.5 bg-muted hover:bg-primary transition-colors" />
            
            {/* AI Chat Panel */}
            <Panel defaultSize={40} minSize={30}>
              <AiChat />
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </Layout>
  )
}