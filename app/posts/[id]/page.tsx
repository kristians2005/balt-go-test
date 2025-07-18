"use client"

import { useEffect, useState, use } from "react"
import { getPost } from "@/services/dataService"
import PostCard from "@/components/PostCard"
import { useRouter } from "next/navigation"

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

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const [mode, setMode] = useState(getMode())
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasMounted, setHasMounted] = useState(false)
  const { id } = use(params)
  const router = useRouter()

  useEffect(() => {
    setHasMounted(true)
    const onModeChange = () => setMode(getMode())
    window.addEventListener("modechange", onModeChange)
    return () => window.removeEventListener("modechange", onModeChange)
  }, [])

  useEffect(() => {
    setLoading(true)
    getPost(mode as 'local' | 'api', id).then((data) => {
      setPost(data)
      setLoading(false)
    })
  }, [mode, id])

  if (!hasMounted) return null

  if (loading) {
    return <div className="text-center py-12 text-lg text-gray-500 dark:text-gray-400">Ielādē ierakstu...</div>
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center">
          <div className="text-gray-400 dark:text-gray-500 text-lg mb-4">Ieraksts nav atrasts</div>
          <button onClick={() => router.back()} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Atpakaļ</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <button onClick={() => router.back()} className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Atpakaļ</button>
        <PostCard title={post.title} body={post.body} index={Number(post.id) - 1} />
      </div>
    </div>
  )
} 