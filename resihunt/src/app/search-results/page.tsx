"use client"

import { Suspense } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { UserNav } from "@/components/user-nav"
import { Input } from "@/components/ui/input"
import SearchResultsContent from "./search-results-content"

export default function SearchResults() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              ResiHunt
            </Link>
            <div className="flex-1 max-w-2xl relative">
              <Input type="text" placeholder="Search..." className="w-full pl-12" />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <UserNav />
          </div>
        </div>
      </header>

      <Suspense fallback={<div>Loading...</div>}>
        <SearchResultsContent />
      </Suspense>
    </div>
  )
}

