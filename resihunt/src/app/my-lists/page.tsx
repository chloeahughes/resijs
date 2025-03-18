"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { UserNav } from "@/components/user-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface List {
  id: string
  name: string
  propertyCount: number
}

const initialLists: List[] = [
  { id: "1", name: "Favorite Homes", propertyCount: 3 },
  { id: "2", name: "Investment Properties", propertyCount: 5 },
  { id: "3", name: "Dream Locations", propertyCount: 2 },
]

export default function MyLists() {
  const [lists, setLists] = useState<List[]>(initialLists)

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-purple-600">
            ResiHunt
          </Link>
          <UserNav />
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">My Lists</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.map((list) => (
            <Card key={list.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{list.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative mb-4 bg-gray-100 rounded-md">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-08%20at%201.16.47%E2%80%AFPM-0vseLXamlR6ZPVWYYNc3TSsAlA37oX.png"
                    alt={list.name}
                    fill
                    className="p-8 object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600">{list.propertyCount} properties</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

