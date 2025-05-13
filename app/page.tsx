// app/page.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Layout } from "@/components/layout"
import { CodeDisplay } from "@/components/code-display"

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-36 bg-background">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Ace Your Technical Interviews
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl max-w-[700px]">
                Practice coding problems, learn algorithms, and prepare for technical interviews with our AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/problems">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                  <Link href="/about">About Us</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block shadow-xl">
              <CodeDisplay className="h-full" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}