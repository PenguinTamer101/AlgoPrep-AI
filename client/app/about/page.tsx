// app/about/page.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Layout } from "@/components/layout"

export default function AboutPage() {
  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] w-full py-12 bg-gray-100 dark:bg-zinc-900">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">About AlgoPrep</h1>
            <p className="text-muted-foreground mt-2">Learn more about our mission and platform</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                AlgoPrep is dedicated to helping developers master technical interviews through
                interactive coding practice and AI-powered guidance. We believe in making
                technical interview preparation accessible, engaging, and effective.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Our Platform</h2>
              <p className="text-muted-foreground">
                Our platform combines the best practices from top coding platforms with
                cutting-edge AI technology to provide personalized learning experiences.
                Practice problems, get instant feedback, and learn from detailed explanations.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Features</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Curated problem sets covering essential algorithms and data structures</li>
                <li>Interactive code editor with real-time feedback</li>
                <li>AI-powered hints and explanations</li>
                <li>Progress tracking and performance analytics</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
              <p className="text-muted-foreground">
                Ready to begin your journey? Head to our problems page and start practicing
                with our carefully curated collection of coding challenges. Our AI assistant
                is here to help you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}