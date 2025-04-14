"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useScrapingContext } from "@/contexts/scraping-context"
import type { Website } from "@/types/api"
import type { ScrapingResult } from "@/types/api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FileDown, Mail, Phone, MapPin, Hash } from "lucide-react"
import { ResultsDialog } from "@/components/results-dialog"

interface WebsiteWithResult extends Website {
  result?: ScrapingResult;
}

export function WebsiteList() {
  const { websites, results } = useScrapingContext()
  const router = useRouter()
  const getStatusColor = (status: Website["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "scraping":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      case "paused":
        return "bg-orange-500"
      case "stopped":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null)

  const openModal = (website: Website) => {
    setSelectedWebsite(website)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedWebsite(null)
  }

  // Find the result for the selected website
  const selectedResult = selectedWebsite 
    ? results?.results?.find(result => result.url === selectedWebsite.url)
    : null

  return (
    <Card className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-200">Websites to Scrape</CardTitle>
        <CardDescription className="text-blue-600 dark:text-blue-300">
          List of websites added for scraping
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-blue-800 dark:text-blue-200">URL</TableHead>
                <TableHead className="text-blue-800 dark:text-blue-200">Status</TableHead>
                <TableHead className="text-blue-800 dark:text-blue-200">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {websites.map((website) => (
                <TableRow key={website.id}>
                  <TableCell className="font-medium text-blue-700 dark:text-blue-300">{website.url}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(website.status)} text-white`}>{website.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {website.status === "completed" && (
                      <button
                        onClick={() => openModal(website)}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-blue-500 text-white hover:bg-blue-600"
                      >
                        View
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ResultsDialog 
          result={selectedResult}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </CardContent>
    </Card>
  )
}

