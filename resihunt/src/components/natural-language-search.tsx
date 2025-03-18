"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NaturalLanguageSearch() {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
        }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "An error occurred")
      }

      const data = await res.text()
      setResponse(data)
    } catch (error) {
      console.error("Error:", error)
      setResponse("Error: " + (error instanceof Error ? error.message : "Unknown error"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about real estate investments..."
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Ask"}
        </Button>
      </form>
      {response && (
        <div className="p-4 bg-white/10 rounded-lg">
          <p className="text-white">{response}</p>
        </div>
      )}
    </div>
  )
}

