"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AuthDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { signIn, signUp, signInWithGoogle } = useAuth()

  const handleAuth = async (type: "signin" | "signup") => {
    try {
      if (type === "signup" && password !== confirmPassword) {
        console.error("Passwords do not match")
        return
      }

      if (type === "signin") {
        await signIn(email, password)
      } else {
        await signUp(email, password)
      }
      setIsOpen(false)
      // Reset form
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.error("Auth error:", error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      setIsOpen(false)
      // Reset form
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.error("Google sign in error:", error)
    }
  }

  return (
    <div className="flex gap-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setActiveTab("signin")}>
            Sign In
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Welcome to AlgoPrep</DialogTitle>
          </DialogHeader>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "signin" | "signup")} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button onClick={() => handleAuth("signin")}>Sign In</Button>
                <Button variant="outline" onClick={handleGoogleSignIn}>
                  Continue with Google
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="signup" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button onClick={() => handleAuth("signup")}>Sign Up</Button>
                <Button variant="outline" onClick={handleGoogleSignIn}>
                  Continue with Google
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setActiveTab("signup")}>Sign Up</Button>
        </DialogTrigger>
      </Dialog>
    </div>
  )
} 