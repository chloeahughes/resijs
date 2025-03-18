"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { ChatInterface } from "@/components/chat-interface"

export default function SearchResultsContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || "Rental Yield for Houses in California"
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Reset loading state when query changes
    setIsLoading(true)
    // Simulate a brief loading state for better UX
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [query])

  const recommendedQuestions = [
    "What cities in California have the top 5 rental yields?",
    "What neighborhoods in Palo Alto have the highest residential growth rate?",
    "Compare investment opportunities between San Francisco and Los Angeles",
    "What are the best property types for rental income in Texas?",
  ]

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-6">
            <div className="h-[600px] bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-sm text-gray-600 mb-4">Showing results for "{query}"</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ChatInterface initialQuery={query} />

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-semibold mb-4">Recommended Questions</h2>
            <div className="space-y-2">
              {recommendedQuestions.map((question, index) => (
                <Link
                  key={index}
                  href={`/search-results?q=${encodeURIComponent(question)}`}
                  className="block text-purple-600 hover:text-purple-700 hover:underline"
                >
                  {question}
                </Link>
              ))}
            </div>
          </div>

          <Button variant="outline" className="text-gray-600" onClick={() => window.history.back()}>
            Back to Search
          </Button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <iframe
              src="https://snazzymaps.com/embed/681769"
              width="100%"
              height="500px"
              style={{ border: "none" }}
              title="Interactive Rental Yield Map"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

