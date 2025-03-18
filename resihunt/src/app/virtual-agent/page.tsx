import Link from "next/link"
import { Bot } from "lucide-react"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function VirtualAgent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            ResiHunt
          </Link>
          <UserNav />
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Bot className="w-16 h-16 mx-auto mb-4 text-blue-600 opacity-50" />
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-2">
              Coming Soon
            </div>
            <h1 className="text-3xl font-bold mb-4">Your Virtual Real Estate Agent</h1>
            <p className="text-lg text-gray-600 mb-8">
              We're working hard to bring you an AI-powered assistant that will help you find the perfect property based
              on your preferences.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Start a New Conversation</CardTitle>
                <CardDescription>Tell me about your ideal property and I'll help you find it.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Property Preferences Quiz</CardTitle>
                <CardDescription>Take a quick quiz to help me understand your preferences better.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Take Quiz
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>How I Can Help</CardTitle>
                <CardDescription>I'm your AI-powered real estate assistant</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Property Recommendations</h3>
                    <p className="text-sm text-gray-600">
                      Get personalized property suggestions based on your preferences
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Market Insights</h3>
                    <p className="text-sm text-gray-600">
                      Receive real-time market analysis and trends for your areas of interest
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Investment Analysis</h3>
                    <p className="text-sm text-gray-600">
                      Get detailed ROI calculations and investment potential analysis
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

