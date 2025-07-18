"use client"

import React from "react"

interface PostCardProps {
  title: string
  body: string
  index: number
}

const PostCard: React.FC<PostCardProps> = ({ title, body, index }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {index + 1}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-900 dark:text-white font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </p>
        {body && (
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-2">{body}</p>
        )}
      </div>
      <div className="flex-shrink-0">
        <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </div>
  )
}

export default PostCard 