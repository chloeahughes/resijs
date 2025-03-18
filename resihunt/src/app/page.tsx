import { SearchBar } from "@/components/search-bar"
import NaturalLanguageSearch from "@/components/natural-language-search"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SearchResultsContent from "@/components/search-results-content"

export default function Home() {
  return (
    <div className="min-h-screen">
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${encodeURI("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AZMIb5CLvVzbXxnohRqh9Dl5I8XQ2x.png")})`,
        }}
      >
        <header className="absolute top-0 left-0 right-0 bg-transparent z-10">
          <div className="container mx-auto px-8 py-8 flex justify-between items-center">
            <Link href="/" className="text-4xl font-bold text-white">
              ResiHunt
            </Link>
            <UserNav />
          </div>
        </header>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-12">Find Your Next Investment Property</h1>
          </div>

          <Tabs defaultValue="structured" className="w-full">
            <TabsList className="w-full bg-white/10 backdrop-blur-md mb-6">
              <TabsTrigger value="structured" className="text-white w-1/2 py-4 text-lg">
                Search by Filter
              </TabsTrigger>
              <TabsTrigger value="natural" className="text-white w-1/2 py-4 text-lg">
                Ask a Question
              </TabsTrigger>
            </TabsList>

            <TabsContent value="structured">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 space-y-8">
                <div className="flex flex-col md:flex-row gap-6 items-center text-white text-lg">
                  <span>I'm looking for the</span>
                  <SearchBar placeholder="Rental Yield" options={metricTypes} darkMode />
                  <span>for</span>
                  <SearchBar placeholder="Houses" options={propertyTypes} darkMode />
                  <span>in</span>
                  <SearchBar placeholder="California" options={locations} darkMode />
                </div>
                <Link href="/search-results" className="block">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6">Search Properties</Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="natural" className="w-full">
              <NaturalLanguageSearch />
              <div className="mt-6 text-center text-white/80 text-base">
                Ask specific questions about properties, markets, or investment strategies
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md">
          <div className="container mx-auto px-8 py-4 text-center">
            <p className="text-white/90 text-base">
              <span className="font-semibold">Coming Soon:</span> Chat with our Virtual Agent to find the perfect
              investment property
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const metricTypes = [
  { value: "rental-yield", label: "Rental Yield" },
  { value: "cap-rate", label: "Cap Rate" },
  { value: "cash-flow", label: "Cash Flow" },
  { value: "appreciation", label: "Appreciation" },
]

const propertyTypes = [
  { value: "houses", label: "Houses" },
  { value: "apartments", label: "Apartments" },
  { value: "condos", label: "Condos" },
  { value: "multi-family", label: "Multi-Family" },
]

const locations = [
  { value: "california", label: "California" },
  { value: "texas", label: "Texas" },
  { value: "florida", label: "Florida" },
  { value: "new-york", label: "New York" },
]

