"use client"

import { useEffect, useState } from "react"
import { getData } from "../services/dataService"
import Link from "next/link"
import PostCard from "@/components/PostCard"

const MODE_KEY = "mode"

const getMode = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(MODE_KEY) || "local"
  }
  return "local"
}

type Post = {
  id: number;
  title: string;
  body: string;
}

export default function AllPosts() {
  const [mode, setMode] = useState(getMode())
  const [data, setData] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    const onModeChange = () => setMode(getMode())
    window.addEventListener("modechange", onModeChange)
    return () => window.removeEventListener("modechange", onModeChange)
  }, [])

  useEffect(() => {
    setLoading(true)
    getData(mode as 'local' | 'api').then((result: Post[]) => {
      setData(result)
      setLoading(false)
    })
  }, [mode])

  if (!hasMounted) return null

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-blue-300">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Ielādē datus...
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Ieraksti</h2>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          {data.length} ieraksti
        </span>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 text-lg">Nav atrasti ieraksti</div>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((item, index) => (
            <Link
              key={item.id}
              href={`/posts/${item.id}`}
              className="block group bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg p-4 transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <PostCard title={item.title} body={item.body} index={index} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
