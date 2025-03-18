"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function NaturalLanguageSearch() {
  const [input, setInput] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      router.push(`/search-results?q=${encodeURIComponent(input)}`)
    }
  }

  return (
    <div className="w-full">
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Try 'What areas in California have the best rental yields?'"
              className="w-full pl-12 h-14 bg-white/20 text-white placeholder:text-white/70 border-white/20"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
          </div>
          <Button
            type="submit"
            disabled={!input.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white h-14 px-6"
          >
            Search
          </Button>
        </form>
      </div>
    </div>
  )
}

