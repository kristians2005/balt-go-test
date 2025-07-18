"use client"

import type React from "react"
import { useEffect, useState } from "react"

const MODE_KEY = "mode"

const getInitialMode = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(MODE_KEY) || "local"
  }
  return "local"
}

const ModeToggle: React.FC = () => {
  const [mode, setMode] = useState(getInitialMode())
  const [hasMounted, setHasMounted] = useState(false)
  const isApi = mode === "api"

  useEffect(() => {
    setHasMounted(true)
    const onStorage = (e: StorageEvent) => {
      if (e.key === MODE_KEY) {
        setMode(e.newValue || "local")
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const handleChange = () => {
    const newMode = isApi ? "local" : "api"
    setMode(newMode)
    localStorage.setItem(MODE_KEY, newMode)
    window.dispatchEvent(new Event("modechange"))
  }

  if (!hasMounted) return null

  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow-inner">
        <div className="flex items-center space-x-4">
          <span
            className={`text-sm font-medium transition-colors ${!isApi ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}
          >
            Lokālais
          </span>

          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={isApi} onChange={handleChange} className="sr-only peer" />
            <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>

          <span
            className={`text-sm font-medium transition-colors ${isApi ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}
          >
            API
          </span>
        </div>

        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
          <div className={`w-2 h-2 rounded-full mr-2 ${isApi ? "bg-green-500" : "bg-orange-500"}`}></div>
          <span className="text-gray-700 dark:text-gray-300">API režīms: {isApi ? "IESLĒGTS" : "IZSLĒGTS"}</span>
        </span>
      </div>
    </div>
  )
}

export default ModeToggle
