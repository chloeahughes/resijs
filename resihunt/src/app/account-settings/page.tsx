import Link from "next/link"
import { UserNav } from "@/components/user-nav"

export default function AccountSettings() {
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
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        <p>This is where users can manage their account settings.</p>
      </main>
    </div>
  )
}

