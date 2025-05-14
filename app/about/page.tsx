// app/about/page.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Layout } from "@/components/layout"

export default function AboutPage() {
  return (
    <Layout>
      {/* About Section */}
      <section className="w-full py-12 md:py-24">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">About AlgoPrep AI</h1>
            <p className="text-lg text-muted-foreground mb-8">
              We're building the best platform to help you ace your technical interviews and land your dream job in software engineering.
            </p>
            <p className="text-muted-foreground mb-8">
              AlgoPrep AI was created by passionate software engineers who understand the challenges of technical interviews. Our platform combines real coding problems with AI-powered guidance to help you practice effectively and build confidence.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-center mb-8">Meet the Team</h2>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Team Member 1 */}
            <Card className="flex flex-col items-center text-center p-6">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src="/api/placeholder/150/150" alt="Alex Johnson" />
                <AvatarFallback>SH</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">Salma Hajian</h3>
              <p className="text-sm text-muted-foreground mb-2">Co-Founder & Developer</p>
              <p className="text-sm mb-4">
                Former Software Engineer at Google with a passion for algorithms and teaching. Alex has conducted over 200 technical interviews and knows what it takes to succeed.
              </p>
              <div className="flex space-x-3 mt-auto">
                <a href="https://github.com/PenguinTamer101" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/salma-hajian" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </Card>

            {/* Team Member 2 */}
            <Card className="flex flex-col items-center text-center p-6">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src="/api/placeholder/150/150" alt="Sam Taylor" />
                <AvatarFallback>JI</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">Javid Ibrahimov</h3>
              <p className="text-sm text-muted-foreground mb-2">Co-Founder & Developer</p>
              <p className="text-sm mb-4">
                ML Engineer with experience at top tech firms. Sam specializes in AI-powered education and is dedicated to creating a personalized learning experience for every user.
              </p>
              <div className="flex space-x-3 mt-auto">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/javidibrahimov" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  )
}