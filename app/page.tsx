"use client"
import type React from "react"
import Navbar from "@/components/Navbar"
import ModeToggle from "../components/ModeToggle"
import AllPosts from "@/components/AllPosts"
import { ModeProvider } from "@/context/ModeContext"

const App: React.FC = () => {
  return (
    <ModeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Datu režīms</h1>
              <p className="text-gray-600 dark:text-gray-300">Pārslēdzieties starp API un lokālo datu režīmu</p>
            </header>

            <div className="mb-8">
              <ModeToggle />
            </div>

            <div className="mt-8">
              <AllPosts />
            </div>
          </div>
        </div>
      </div>
    </ModeProvider>
  )
}

export default App
