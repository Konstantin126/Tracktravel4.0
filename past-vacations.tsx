"use client"

import { useState } from "react"
import { CalendarDays, MapPin, Plane, Train, Ship, Bus, Car, User, Bike } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import PhotoGalleryModal from "./photo-gallery-modal"
import type { Dictionary } from "../dictionaries"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface PastVacationsProps {
  dict: Dictionary
  lang: string
}

// Define transportation types and their corresponding icons
const transportationIcons = {
  plane: Plane,
  train: Train,
  ship: Ship,
  bus: Bus,
  car: Car,
  walking: User,
  motorcycle: Bike,
}

type TransportationType = keyof typeof transportationIcons

export default function PastVacations({ dict, lang }: PastVacationsProps) {
  // State for photo gallery modal
  const [photoModalOpen, setPhotoModalOpen] = useState(false)
  const [selectedVacation, setSelectedVacation] = useState("")

  // State for review modal
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [reviewVacation, setReviewVacation] = useState("")
  const [reviewText, setReviewText] = useState("")

  // State for transportation icons
  const [parisTransport, setParisTransport] = useState<TransportationType>("train")
  const [nyTransport, setNyTransport] = useState<TransportationType>("plane")

  // Fixed dates for past vacations
  const parisStartDate = new Date(2025, 1, 14) // Feb 14, 2025
  const parisEndDate = new Date(2025, 1, 16) // Feb 16, 2025
  const nyStartDate = new Date(2024, 11, 20) // Dec 20, 2024
  const nyEndDate = new Date(2024, 11, 27) // Dec 27, 2024

  // Function to open the photo modal
  const openPhotoModal = (vacationName: string) => {
    setSelectedVacation(vacationName)
    setPhotoModalOpen(true)
  }

  // Function to open the review modal
  const openReviewModal = (vacationName: string) => {
    setReviewVacation(vacationName)
    setReviewModalOpen(true)
  }

  // Function to submit review
  const submitReview = () => {
    // In a real app, you would save the review to a database
    console.log(`Review for ${reviewVacation}: ${reviewText}`)
    setReviewModalOpen(false)
    setReviewText("")
  }

  // Function to render the selected transportation icon
  const renderTransportIcon = (type: TransportationType) => {
    const IconComponent = transportationIcons[type]
    return <IconComponent className="h-5 w-5 text-muted-foreground" />
  }

  // Function to format date range
  const formatDateRange = (startDate: Date, endDate: Date) => {
    if (lang === "bg") {
      return `${startDate.getDate()} ${getMonthNameBg(startDate.getMonth())} - ${endDate.getDate()} ${getMonthNameBg(endDate.getMonth())}, ${startDate.getFullYear()}`
    }

    return `${getMonthNameEn(startDate.getMonth())} ${startDate.getDate()} - ${getMonthNameEn(endDate.getMonth())} ${endDate.getDate()}, ${startDate.getFullYear()}`
  }

  // Helper functions for month names
  const getMonthNameEn = (month: number) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    return months[month]
  }

  const getMonthNameBg = (month: number) => {
    const months = [
      "януари",
      "февруари",
      "март",
      "април",
      "май",
      "юни",
      "юли",
      "август",
      "септември",
      "октомври",
      "ноември",
      "декември",
    ]
    return months[month]
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>{dict.dashboard.vacations.parisWeekend}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    {renderTransportIcon(parisTransport)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setParisTransport("plane")}>
                    <Plane className="mr-2 h-4 w-4" />
                    <span>{dict.transportation.plane}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setParisTransport("train")}>
                    <Train className="mr-2 h-4 w-4" />
                    <span>{dict.transportation.train}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setParisTransport("ship")}>
                    <Ship className="mr-2 h-4 w-4" />
                    <span>{dict.transportation.ship}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setParisTransport("bus")}>
                    <Bus className="mr-2 h-4 w-4" />
                    <span>{dict.transportation.bus}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setParisTransport("car")}>
                    <Car className="mr-2 h-4 w-4" />
                    <span>{dict.transportation.car}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setParisTransport("walking")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>{dict.transportation.walking}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setParisTransport("motorcycle")}>
                    <Bike className="mr-2 h-4 w-4" />
                    <span>{dict.transportation.motorcycle}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription className="flex items-center">
              <MapPin className="mr-1 h-3.5 w-3.5" />
              {dict.dashboard.locations.paris}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-1">
            <div className="mb-4 aspect-video overflow-hidden rounded-lg relative group">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Paris"
                className="h-full w-full object-cover"
                id="paris-image"
                onError={(e) => {
                  console.error("Failed to load Paris image")
                  e.currentTarget.src = "/placeholder.svg?height=200&width=400"
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label htmlFor="paris-photo-input" className="cursor-pointer">
                  <div className="bg-white text-black px-3 py-2 rounded-md flex items-center gap-2 text-sm font-medium hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                    {lang === "bg" ? "Избери снимка" : "Choose photo"}
                  </div>
                </label>
                <input
                  type="file"
                  id="paris-photo-input"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    try {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                          try {
                            const imgElement = document.getElementById("paris-image") as HTMLImageElement
                            if (imgElement && event.target?.result) {
                              imgElement.src = event.target.result as string
                            }
                          } catch (error) {
                            console.error("Error updating Paris image:", error)
                          }
                        }
                        reader.onerror = (error) => {
                          console.error("Error reading file:", error)
                        }
                        reader.readAsDataURL(file)
                      }
                    } catch (error) {
                      console.error("Error handling file selection:", error)
                    }
                  }}
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <CalendarDays className="mr-1 h-4 w-4 text-muted-foreground" />
                  {formatDateRange(parisStartDate, parisEndDate)}
                </div>
                <span className="font-medium text-gray-600">{dict.dashboard.vacationStatus.completed}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => openPhotoModal(dict.dashboard.vacations.parisWeekend)}
            >
              {dict.dashboard.actions.viewPhotos}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => openReviewModal(dict.dashboard.vacations.parisWeekend)}
            >
              {dict.dashboard.actions.review}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>{dict.dashboard.vacations.newYorkCity}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    {renderTransportIcon(nyTransport)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setNyTransport("plane")}>
                    <Plane className="mr-2 h-4 w-4" />
                    <span>{dict.transportation.plane}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setNyTransport("train")}>
                    <Train className="mr-2 h-4 w-4" />
                    <span>{dict.transportation.train}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setNyTransport("ship")}>
                    <Ship className="mr-2 h-4 w-4" />
                    <span>{dict.transportation.ship}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setNyTransport("bus")}>
                    <Bus className="mr-2 h-4 w-4" />
                    <span>{dict.transportation.bus}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setNyTransport("car")}>
                    <Car className="mr-2 h-4 w-4" />
                    <span>{dict.transportation.car}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setNyTransport("walking")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>{dict.transportation.walking}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setNyTransport("motorcycle")}>
                    <Bike className="mr-2 h-4 w-4" />
                    <span>{dict.transportation.motorcycle}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription className="flex items-center">
              <MapPin className="mr-1 h-3.5 w-3.5" />
              {dict.dashboard.locations.newYork}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-1">
            <div className="mb-4 aspect-video overflow-hidden rounded-lg relative group">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="New York"
                className="h-full w-full object-cover"
                id="ny-image"
                onError={(e) => {
                  console.error("Failed to load New York image")
                  e.currentTarget.src = "/placeholder.svg?height=200&width=400"
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label htmlFor="ny-photo-input" className="cursor-pointer">
                  <div className="bg-white text-black px-3 py-2 rounded-md flex items-center gap-2 text-sm font-medium hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                    {lang === "bg" ? "Избери снимка" : "Choose photo"}
                  </div>
                </label>
                <input
                  type="file"
                  id="ny-photo-input"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    try {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                          try {
                            const imgElement = document.getElementById("ny-image") as HTMLImageElement
                            if (imgElement && event.target?.result) {
                              imgElement.src = event.target.result as string
                            }
                          } catch (error) {
                            console.error("Error updating NY image:", error)
                          }
                        }
                        reader.onerror = (error) => {
                          console.error("Error reading file:", error)
                        }
                        reader.readAsDataURL(file)
                      }
                    } catch (error) {
                      console.error("Error handling file selection:", error)
                    }
                  }}
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <CalendarDays className="mr-1 h-4 w-4 text-muted-foreground" />
                  {formatDateRange(nyStartDate, nyEndDate)}
                </div>
                <span className="font-medium text-gray-600">{dict.dashboard.vacationStatus.completed}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => openPhotoModal(dict.dashboard.vacations.newYorkCity)}
            >
              {dict.dashboard.actions.viewPhotos}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => openReviewModal(dict.dashboard.vacations.newYorkCity)}
            >
              {dict.dashboard.actions.review}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Photo Gallery Modal */}
      <PhotoGalleryModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        vacationName={selectedVacation}
        dict={dict}
        lang={lang}
      />

      {/* Review Modal */}
      <Dialog open={reviewModalOpen} onOpenChange={(open) => !open && setReviewModalOpen(false)}>
        <DialogContent className="sm:max-w-md" onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>
              {lang === "bg" ? "Отзив за" : "Review for"} {reviewVacation}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              {lang === "bg"
                ? "Споделете вашите впечатления от тази ваканция. Какво ви хареса най-много?"
                : "Share your impressions about this vacation. What did you like the most?"}
            </p>
            <Textarea
              placeholder={lang === "bg" ? "Напишете вашия отзив тук..." : "Write your review here..."}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={6}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewModalOpen(false)}>
              {lang === "bg" ? "Отказ" : "Cancel"}
            </Button>
            <Button onClick={submitReview} disabled={!reviewText.trim()}>
              {lang === "bg" ? "Изпрати" : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

