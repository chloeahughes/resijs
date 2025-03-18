"use client"

import type React from "react"

import { useChat, type Message } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, AlertCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ChatInterfaceProps {
  initialQuery?: string
}

export function ChatInterface({ initialQuery }: ChatInterfaceProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    initialMessages: initialQuery
      ? [
          {
            id: "initial-query",
            role: "user",
            content: initialQuery,
          } as Message,
        ]
      : [],
    body: {
      initialQuery,
    },
    onError: (error) => {
      console.error("Chat error:", error)
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message")
      // Clear error message after 5 seconds
      setTimeout(() => setErrorMessage(null), 5000)
    },
  })

  // Auto-scroll to the latest message
  useEffect(() => {
    const scrollArea = scrollAreaRef.current
    if (scrollArea) {
      // Use requestAnimationFrame to ensure the scroll happens after the content is rendered
      requestAnimationFrame(() => {
        scrollArea.scrollTop = scrollArea.scrollHeight
      })
    }
  }, [messages])

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null) // Clear any previous errors

    if (!input.trim()) return

    try {
      await handleSubmit(e)
    } catch (error) {
      console.error("Failed to send message:", error)
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message")
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="font-semibold">AI Assistant</h2>
      </div>

      {errorMessage && (
        <Alert variant="destructive" className="m-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        {isLoading && (
          <div className="flex items-center justify-center space-x-2 py-4">
            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
            <span className="text-sm text-gray-500">AI is thinking...</span>
          </div>
        )}
      </ScrollArea>

      <form onSubmit={handleFormSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a follow-up question..."
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()} className="min-w-[80px]">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
          </Button>
        </div>
      </form>
    </div>
  )
}

