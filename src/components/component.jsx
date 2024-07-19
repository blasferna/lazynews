"use client"

import { useState } from "react"
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Component({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  return (
    (<div
      className={`flex flex-col min-h-screen ${
        isDarkMode ? "dark:bg-[#1a1b1e] dark:text-white" : "bg-white text-black"
      }`}>
      <header
        className={`bg-primary text-primary-foreground py-4 px-6 shadow ${
          isDarkMode ? "dark:bg-[#2a2b2e] dark:text-white" : ""
        }`}>
        <div className="container mx-auto flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <NewspaperIcon className="w-6 h-6" />
            <span className="text-xl font-bold">AI News</span>
          </Link>
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <MenuIcon className="w-5 h-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="md:hidden">
                <nav className="grid gap-4 p-4">
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Home
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Technology
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Business
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Science
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Sports
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Entertainment
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#" className="hover:underline" prefetch={false}>
                Home
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                Technology
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                Business
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                Science
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                Sports
              </Link>
              <Link href="#" className="hover:underline" prefetch={false}>
                Entertainment
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <SearchIcon className="w-5 h-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Button variant="ghost" size="icon">
                <UserIcon className="w-5 h-5" />
                <span className="sr-only">Profile</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
                <SunMoonIcon className="w-5 h-5" />
                <span className="sr-only">Toggle Dark Mode</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main
        className={`flex-1 ${isDarkMode ? "dark:bg-[#1a1b1e] dark:text-white" : "bg-background text-foreground"}`}>
        <div
          className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
            {children}
          </div>
          <div className="hidden md:block">
            <Card className={`${isDarkMode ? "dark:bg-[#2a2b2e] dark:text-white" : ""}`}>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="grid gap-2">
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Technology
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Business
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Science
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Sports
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Entertainment
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Politics
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Health
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Environment
                  </Link>
                </nav>
              </CardContent>
            </Card>
            <Card
              className={`mt-6 ${isDarkMode ? "dark:bg-[#2a2b2e] dark:text-white" : ""}`}>
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="grid gap-2">
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Artificial Intelligence
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Climate Change
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Cryptocurrency
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Remote Work
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Renewable Energy
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Autonomous Vehicles
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Healthcare Innovation
                  </Link>
                  <Link href="#" className="hover:underline" prefetch={false}>
                    Social Media Trends
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer
        className={`bg-primary text-primary-foreground py-4 px-6 shadow ${
          isDarkMode ? "dark:bg-[#2a2b2e] dark:text-white" : ""
        }`}>
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm">© 2023 AI News. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <Link href="#" className="hover:underline" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>
    </div>)
  );
}

function MenuIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>)
  );
}


function MoonIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>)
  );
}


function NewspaperIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>)
  );
}


function SearchIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>)
  );
}


function SunMoonIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.3 17.7-1.4 1.4" />
      <path d="m19.1 4.9-1.4 1.4" />
    </svg>)
  );
}


function UserIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>)
  );
}


function XIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>)
  );
}
