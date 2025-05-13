// components/navbar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()
  
  return (
    <header className="border-b w-full bg-background">
      <div className="w-full max-w-[1600px] mx-auto flex h-16 items-center justify-between px-6 sm:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="font-bold text-xl">
            AlgoPrep AI
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/problems" 
            className={`text-sm font-medium ${pathname === "/problems" ? "text-primary" : "hover:text-primary"}`}
          >
            Problems
          </Link>
          <Link 
            href="/about" 
            className={`text-sm font-medium ${pathname === "/about" ? "text-primary" : "hover:text-primary"}`}
          >
            About
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}