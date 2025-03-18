"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import Link from "next/link"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface Property {
  address: string
  price: number
  metrics: {
    roi: number
    capRate: number
    cashFlow: number
    appreciation: number
    rentalGrowth: number
  }
  historicalGrowth: number[]
}

const sampleProperties: Property[] = [
  {
    address: "123 Main St",
    price: 250000,
    metrics: {
      roi: 7.5,
      capRate: 5.2,
      cashFlow: 1200,
      appreciation: 3.5,
      rentalGrowth: 3.7,
    },
    historicalGrowth: [2.8, 3.2, 2.5, 2.0, 3.7],
  },
  {
    address: "456 Elm St",
    price: 300000,
    metrics: {
      roi: 8.1,
      capRate: 5.8,
      cashFlow: 1500,
      appreciation: 4.0,
      rentalGrowth: 4.2,
    },
    historicalGrowth: [3.0, 3.4, 2.8, 4.0, 4.2],
  },
  {
    address: "789 Oak St",
    price: 280000,
    metrics: {
      roi: 7.8,
      capRate: 5.5,
      cashFlow: 1350,
      appreciation: 3.75,
      rentalGrowth: 3.9,
    },
    historicalGrowth: [2.9, 3.3, 2.6, 3.5, 3.9],
  },
  {
    address: "101 Pine St",
    price: 320000,
    metrics: {
      roi: 7.9,
      capRate: 5.6,
      cashFlow: 1400,
      appreciation: 3.8,
      rentalGrowth: 4.0,
    },
    historicalGrowth: [3.1, 3.5, 2.7, 3.8, 4.0],
  },
  {
    address: "202 Maple Ave",
    price: 275000,
    metrics: {
      roi: 7.7,
      capRate: 5.4,
      cashFlow: 1300,
      appreciation: 3.6,
      rentalGrowth: 3.8,
    },
    historicalGrowth: [2.7, 3.1, 2.4, 3.2, 3.8],
  },
  {
    address: "303 Cedar Ln",
    price: 310000,
    metrics: {
      roi: 8.0,
      capRate: 5.7,
      cashFlow: 1450,
      appreciation: 3.9,
      rentalGrowth: 4.1,
    },
    historicalGrowth: [3.2, 3.6, 2.9, 3.9, 4.1],
  },
]

const chartColors = ["#818CF8", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([])

  const filteredProperties = sampleProperties.filter((property) =>
    property.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleProperty = (property: Property) => {
    setSelectedProperties((prev) =>
      prev.some((p) => p.address === property.address)
        ? prev.filter((p) => p.address !== property.address)
        : prev.length < 5
          ? [...prev, property]
          : prev,
    )
  }

  const chartData = {
    labels: ["2018", "2019", "2020", "2021", "2022"],
    datasets: selectedProperties.map((property, index) => ({
      label: property.address,
      data: property.historicalGrowth,
      borderColor: chartColors[index],
      backgroundColor: chartColors[index],
      tension: 0.4,
    })),
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `${value}%`,
        },
      },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-purple-600">
            ResiHunt
          </Link>
          <UserNav />
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Search */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Search Properties</h2>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search by address"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="default">Search</Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredProperties.map((property) => {
                const isSelected = selectedProperties.some((p) => p.address === property.address)
                return (
                  <div
                    key={property.address}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                      isSelected ? "bg-blue-100 border-blue-300" : "hover:bg-gray-100"
                    }`}
                    onClick={() => toggleProperty(property)}
                  >
                    <div>
                      <div className="font-medium">{property.address}</div>
                      <div className="text-sm text-gray-500">${property.price.toLocaleString()}</div>
                    </div>
                    {isSelected && (
                      <div className="text-blue-500">
                        <Check className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column - Metrics and Chart */}
          <div className="lg:col-span-2 space-y-8">
            {/* Metrics Comparison */}
            <div>
              <h2 className="text-xl font-bold mb-4">Metrics Comparison</h2>
              <div className="border rounded-lg overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Metric</th>
                      {selectedProperties.map((property) => (
                        <th key={property.address} className="px-4 py-2 text-left">
                          {property.address}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border-t">Price</td>
                      {selectedProperties.map((property) => (
                        <td key={property.address} className="px-4 py-2 border-t">
                          ${property.price.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-t">ROI</td>
                      {selectedProperties.map((property) => (
                        <td key={property.address} className="px-4 py-2 border-t">
                          {property.metrics.roi.toFixed(2)}%
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-t">Cap Rate</td>
                      {selectedProperties.map((property) => (
                        <td key={property.address} className="px-4 py-2 border-t">
                          {property.metrics.capRate.toFixed(2)}%
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-t">Cash Flow</td>
                      {selectedProperties.map((property) => (
                        <td key={property.address} className="px-4 py-2 border-t">
                          ${property.metrics.cashFlow.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-t">Appreciation</td>
                      {selectedProperties.map((property) => (
                        <td key={property.address} className="px-4 py-2 border-t">
                          {property.metrics.appreciation.toFixed(2)}%
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-t">Latest Rental Growth</td>
                      {selectedProperties.map((property) => (
                        <td key={property.address} className="px-4 py-2 border-t">
                          {property.metrics.rentalGrowth.toFixed(2)}%
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Rental Growth Chart */}
            <div>
              <h2 className="text-xl font-bold mb-4">Rental Growth Rates Comparison</h2>
              <div className="border rounded-lg p-4">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

