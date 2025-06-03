// app/problems/[id]/page.tsx
"use client"

import { useState, useRef } from "react"
import { Layout } from "@/components/layout"
import { useParams } from "next/navigation"
import CodeEditor from "@/components/code-editor"
import AiChat, { AiChatRef } from "@/components/ai-chat"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Badge } from "@/components/ui/badge"
import { getHint, ProblemContext } from "@/lib/gemini"

export default function ProblemPage() {
  const [language, setLanguage] = useState("python")
  const [activeTab, setActiveTab] = useState("problem")
  const [code, setCode] = useState("")
  const chatRef = useRef<AiChatRef>(null)
  const params = useParams()
  const id = params.id as string
  
  // Sample problem data - would normally be fetched based on id
  const problem: ProblemContext = {
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
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
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

  // Handle code changes
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  }

  // Handle hint request
  const handleHintRequest = async () => {
    try {
      // Switch to chat tab to show the hint
      setActiveTab("chat");
      
      // Get hint from Gemini
      const hint = await getHint(problem, code, language);
      
      // Add hint to chat using ref
      if (chatRef.current) {
        chatRef.current.addMessage({
          role: "assistant",
          content: hint,
          id: `hint-${Date.now()}`
        });
      }
    } catch (error) {
      console.error("Error getting hint:", error);
    }
  }

  // Function to determine badge variant based on difficulty
  const getDifficultyVariant = (difficulty: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "default";
      case "medium":
        return "secondary";
      case "hard":
        return "destructive";
      default:
        return "outline";
    }
  }

  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)] bg-gray-100 dark:bg-zinc-900 p-4">
        <ResizablePanelGroup direction="horizontal" className="h-full gap-4">
          {/* Left Panel (Problem/Chat) */}
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="h-full flex flex-col border border-border rounded-md overflow-hidden bg-white dark:bg-zinc-800 shadow-md">
              {/* Problem Title (only on left side) */}
              <div className="border-b px-6 py-3">
                <h1 className="text-xl font-bold">{problem.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">Problem #{id}</Badge>
                  <Badge variant={getDifficultyVariant(problem.difficulty)}>{problem.difficulty}</Badge>
                </div>
              </div>

              {/* Custom Tab Navigation */}
              <div className="px-6 py-3 border-b border-border">
                <div className="inline-flex h-9 items-center justify-center rounded-lg bg-gray-50 dark:bg-zinc-700/50 p-1 text-muted-foreground">
                  <button
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      activeTab === "problem"
                        ? "bg-white dark:bg-zinc-800 text-foreground shadow-sm"
                        : "hover:text-foreground"
                    }`}
                    onClick={() => setActiveTab("problem")}
                  >
                    Problem
                  </button>
                  <button
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      activeTab === "chat"
                        ? "bg-white dark:bg-zinc-800 text-foreground shadow-sm"
                        : "hover:text-foreground"
                    }`}
                    onClick={() => setActiveTab("chat")}
                  >
                    AI Assistant
                  </button>
                </div>
              </div>
              
              {/* Content Based on Active Tab */}
              <div className="flex-1 overflow-hidden">
                {activeTab === "problem" && (
                  <div className="h-full overflow-y-auto p-6">
                    <div dangerouslySetInnerHTML={{ __html: problem.description }} className="prose max-w-none mb-6" />
                    
                    <h3 className="font-semibold mb-2">Examples:</h3>
                    {problem.examples.map((example, index) => (
                      <div key={index} className="mb-4 bg-gray-50 dark:bg-zinc-700/50 p-3 rounded-md">
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
                )}
                
                {activeTab === "chat" && (
                  <div className="h-full">
                    <AiChat ref={chatRef} />
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Right Panel (Code Editor) */}
          <ResizablePanel defaultSize={60} minSize={40}>
            <CodeEditor 
              language={language}
              code={code || getStarterCode(language)}
              onChange={handleCodeChange}
              onLanguageChange={setLanguage}
              showLineNumbers={true}
              onHintRequest={handleHintRequest}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Layout>
  )
}