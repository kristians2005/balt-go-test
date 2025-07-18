"use client"

import { useEffect, useState, useContext } from "react"
import { getData } from "../services/dataService"
import { ModeContext } from "@/context/ModeContext"

export default function AllPosts() {
  const { mode } = useContext(ModeContext)
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getData(mode).then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [mode])

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
            <div
              key={item.id}
              className="group bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg p-4 transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 dark:text-white font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </p>
                  {item.body && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-2">{item.body}</p>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
