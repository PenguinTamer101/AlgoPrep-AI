// app/problems/page.tsx - Problems page with modular navbar
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Layout } from "@/components/layout"

// Sample problem data
const problems = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    tags: ["Array", "Hash Table"]
  },
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    description: "Determine if a string is a palindrome, considering only alphanumeric characters and ignoring case.",
    tags: ["String", "Two Pointers"]
  },
  {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    description: "Merge two sorted linked lists and return it as a new sorted list.",
    tags: ["Linked List", "Recursion"]
  }
]

export default function ProblemsPage() {
  return (
    <Layout>
      {/* Problems List */}
      <section className="w-full py-12">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Practice Problems</h1>
            <p className="text-muted-foreground mt-2">Select a problem to start coding</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {problems.map((problem) => (
              <Link key={problem.id} href={`/problems/${problem.id}`} className="group">
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {problem.title}
                      </CardTitle>
                      <Badge 
                        variant={
                          problem.difficulty === "Easy" ? "default" :
                          problem.difficulty === "Medium" ? "secondary" : "destructive"
                        }
                      >
                        {problem.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {problem.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="pt-1 flex flex-wrap gap-2">
                    {problem.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}