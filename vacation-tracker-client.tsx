"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { CalendarDays, Compass, MapPin, Plane, Ship, Train, User, Car, Bus, Bike, Map } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Dictionary } from "../dictionaries"
import LanguageSwitcher from "./language-switcher"
import PastVacations from "./past-vacations"
import NewsletterSubscription from "./newsletter-subscription"
// Добавете импорт за новия компонент в началото на файла
import MapDialog from "./map-dialog"

// Define transportation types and their corresponding icons
type TransportationType = "plane" | "train" | "ship" | "bus" | "car" | "walking" | "motorcycle"

export default function VacationTrackerClient({
  params,
  dict,
}: {
  params: { lang: string }
  dict: Dictionary
}) {
  // Ensure we have a valid lang parameter
  const lang = params?.lang === "bg" ? "bg" : "en"

  // State for transportation icons
  const [greekTransport, setGreekTransport] = useState<TransportationType>("ship")
  const [alpineTransport, setAlpineTransport] = useState<TransportationType>("train")
  const [tokyoTransport, setTokyoTransport] = useState<TransportationType>("plane")
  const [baliTransport, setBaliTransport] = useState<TransportationType>("plane")

  // State for account dialog
  const [accountDialogOpen, setAccountDialogOpen] = useState(false)
  const [accountForm, setAccountForm] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  // Добавете състояние за диалоговия прозорец за карти след другите състояния
  const [mapDialogOpen, setMapDialogOpen] = useState(false)

  // Function to render the selected transportation icon
  const renderTransportIcon = (type: TransportationType) => {
    switch (type) {
      case "plane":
        return <Plane className="h-5 w-5 text-muted-foreground" />
      case "train":
        return <Train className="h-5 w-5 text-muted-foreground" />
      case "ship":
        return <Ship className="h-5 w-5 text-muted-foreground" />
      case "bus":
        return <Bus className="h-5 w-5 text-muted-foreground" />
      case "car":
        return <Car className="h-5 w-5 text-muted-foreground" />
      case "walking":
        return <User className="h-5 w-5 text-muted-foreground" />
      case "motorcycle":
        return <Bike className="h-5 w-5 text-muted-foreground" />
      default:
        return <Plane className="h-5 w-5 text-muted-foreground" />
    }
  }

  // Handle account form changes
  const handleAccountFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAccountForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle account form submission
  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log("Account created:", accountForm)
    // Set logged in state and username
    setIsLoggedIn(true)
    setUsername(accountForm.name)
    // Close the dialog
    setAccountDialogOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Compass className="h-6 w-6" />
            <span className="text-xl font-bold">TrackTravel</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#" className="text-sm font-medium">
              {dict.navigation.dashboard}
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground">
              {dict.navigation.bookings}
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground">
              {dict.navigation.wishlist}
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground">
              {dict.navigation.support}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="mr-2 hidden md:flex">
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
                className="mr-2 h-4 w-4"
              >
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <path d="M12 18h.01" />
              </svg>
              {dict.navigation.getMobileApp}
            </Button>
            <LanguageSwitcher lang={lang} />
            {isLoggedIn ? (
              <Button variant="ghost" size="icon" className="rounded-full relative group">
                <User className="h-5 w-5" />
                <span className="sr-only">User account</span>
                <div className="absolute hidden group-hover:block right-0 top-full mt-2 bg-white shadow-lg rounded-md p-2 min-w-[150px] z-10">
                  <div className="px-3 py-2 text-sm font-medium border-b border-gray-100">{username}</div>
                  <button
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-sm"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    {lang === "bg" ? "Излез" : "Sign Out"}
                  </button>
                </div>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setAccountDialogOpen(true)}>
                  <User className="h-5 w-5" />
                  <span className="sr-only">User account</span>
                </Button>

                <Dialog open={accountDialogOpen} onOpenChange={setAccountDialogOpen}>
                  <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
                    <DialogHeader>
                      <DialogTitle>{lang === "bg" ? "Създай акаунт" : "Create Account"}</DialogTitle>
                      <DialogDescription>
                        {lang === "bg"
                          ? "Създайте акаунт, за да запазите вашите екскурзии и снимки."
                          : "Create an account to save your trips and photos."}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAccountSubmit} noValidate>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">{lang === "bg" ? "Име" : "Name"}</Label>
                          <Input
                            id="name"
                            name="name"
                            value={accountForm.name}
                            onChange={handleAccountFormChange}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">{lang === "bg" ? "Имейл" : "Email"}</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={accountForm.email}
                            onChange={handleAccountFormChange}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="password">{lang === "bg" ? "Парола" : "Password"}</Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            value={accountForm.password}
                            onChange={handleAccountFormChange}
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">{lang === "bg" ? "Създай акаунт" : "Create Account"}</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6 md:py-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{dict.dashboard.welcome}</h1>
              <p className="text-muted-foreground">{dict.dashboard.trackVacations}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <Button className="w-full md:w-auto">
                <Compass className="mr-2 h-4 w-4" />
                {dict.dashboard.exploreDestinations}
              </Button>
              <NewsletterSubscription dict={dict} lang={lang} />
            </div>
          </div>

          <Tabs defaultValue="upcoming" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">{dict.dashboard.tabs.upcoming}</TabsTrigger>
              <TabsTrigger value="active">{dict.dashboard.tabs.active}</TabsTrigger>
              <TabsTrigger value="past">{dict.dashboard.tabs.past}</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>{dict.dashboard.vacations.greekIslandsCruise}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            {renderTransportIcon(greekTransport)}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setGreekTransport("plane")}>
                            <Plane className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.plane}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setGreekTransport("train")}>
                            <Train className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.train}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setGreekTransport("ship")}>
                            <Ship className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.ship}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setGreekTransport("bus")}>
                            <Bus className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.bus}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setGreekTransport("car")}>
                            <Car className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.car}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setGreekTransport("walking")}>
                            <User className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.walking}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setGreekTransport("motorcycle")}>
                            <Bike className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.motorcycle}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="flex items-center">
                      <MapPin className="mr-1 h-3.5 w-3.5" />
                      {dict.dashboard.locations.athens}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-1">
                    <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Greek Islands"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <CalendarDays className="mr-1 h-4 w-4 text-muted-foreground" />
                          {dict.dashboard.dates.greekIslandsCruise}
                        </div>
                        <span className="font-medium text-emerald-600">{dict.dashboard.vacationStatus.confirmed}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {dict.dashboard.vacationStatus.departureIn} 74 {dict.dashboard.vacationStatus.days}
                          </span>
                          <span>45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      {dict.dashboard.actions.viewDetails}
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>{dict.dashboard.vacations.alpineSkiResort}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            {renderTransportIcon(alpineTransport)}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setAlpineTransport("plane")}>
                            <Plane className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.plane}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setAlpineTransport("train")}>
                            <Train className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.train}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setAlpineTransport("ship")}>
                            <Ship className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.ship}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setAlpineTransport("bus")}>
                            <Bus className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.bus}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setAlpineTransport("car")}>
                            <Car className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.car}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setAlpineTransport("walking")}>
                            <User className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.walking}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setAlpineTransport("motorcycle")}>
                            <Bike className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.motorcycle}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="flex items-center">
                      <MapPin className="mr-1 h-3.5 w-3.5" />
                      {dict.dashboard.locations.chamonix}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-1">
                    <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Alpine Ski Resort"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <CalendarDays className="mr-1 h-4 w-4 text-muted-foreground" />
                          {dict.dashboard.dates.alpineSkiResort}
                        </div>
                        <span className="font-medium text-amber-600">{dict.dashboard.vacationStatus.pending}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {dict.dashboard.vacationStatus.departureIn} 252 {dict.dashboard.vacationStatus.days}
                          </span>
                          <span>15%</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      {dict.dashboard.actions.viewDetails}
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>{dict.dashboard.vacations.tokyoAdventure}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            {renderTransportIcon(tokyoTransport)}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setTokyoTransport("plane")}>
                            <Plane className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.plane}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTokyoTransport("train")}>
                            <Train className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.train}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTokyoTransport("ship")}>
                            <Ship className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.ship}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTokyoTransport("bus")}>
                            <Bus className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.bus}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTokyoTransport("car")}>
                            <Car className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.car}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTokyoTransport("walking")}>
                            <User className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.walking}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTokyoTransport("motorcycle")}>
                            <Bike className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.motorcycle}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="flex items-center">
                      <MapPin className="mr-1 h-3.5 w-3.5" />
                      {dict.dashboard.locations.tokyo}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-1">
                    <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Tokyo"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <CalendarDays className="mr-1 h-4 w-4 text-muted-foreground" />
                          {dict.dashboard.dates.tokyoAdventure}
                        </div>
                        <span className="font-medium text-emerald-600">{dict.dashboard.vacationStatus.confirmed}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {dict.dashboard.vacationStatus.departureIn} 156 {dict.dashboard.vacationStatus.days}
                          </span>
                          <span>30%</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      {dict.dashboard.actions.viewDetails}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="active">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>{dict.dashboard.vacations.baliBeachResort}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            {renderTransportIcon(baliTransport)}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setBaliTransport("plane")}>
                            <Plane className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.plane}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setBaliTransport("train")}>
                            <Train className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.train}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setBaliTransport("ship")}>
                            <Ship className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.ship}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setBaliTransport("bus")}>
                            <Bus className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.bus}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setBaliTransport("car")}>
                            <Car className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.car}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setBaliTransport("walking")}>
                            <User className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.walking}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setBaliTransport("motorcycle")}>
                            <Bike className="mr-2 h-4 w-4" />
                            <span>{dict.transportation.motorcycle}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="flex items-center">
                      <MapPin className="mr-1 h-3.5 w-3.5" />
                      {dict.dashboard.locations.bali}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-1">
                    <div className="mb-4 aspect-video overflow-hidden rounded-lg relative group">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Bali Beach"
                        className="h-full w-full object-cover"
                        id="bali-image"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label htmlFor="gallery-upload" className="cursor-pointer">
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
                            {lang === "bg" ? "Избери от галерията" : "Choose from gallery"}
                          </div>
                        </label>
                        <input
                          type="file"
                          id="gallery-upload"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onload = (event) => {
                                const imgElement = document.getElementById("bali-image") as HTMLImageElement
                                if (imgElement && event.target?.result) {
                                  imgElement.src = event.target.result as string
                                }
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <CalendarDays className="mr-1 h-4 w-4 text-muted-foreground" />
                          {dict.dashboard.dates.baliBeachResort}
                        </div>
                        <span className="font-medium text-blue-600">{dict.dashboard.vacationStatus.inProgress}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {dict.dashboard.vacationStatus.day} 3 {dict.dashboard.vacationStatus.of} 10
                          </span>
                          <span>30%</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="w-full">
                      {dict.dashboard.actions.viewItinerary}
                    </Button>
                    <Button
                      variant="primary"
                      className="w-full flex items-center justify-center"
                      onClick={() => setMapDialogOpen(true)}
                    >
                      <Map className="h-4 w-4 mr-2" />
                      {lang === "bg" ? "Карти и маршрути" : "Maps & Routes"}
                    </Button>

                    {/* Диалогов прозорец за карти */}
                    <MapDialog
                      open={mapDialogOpen}
                      onOpenChange={setMapDialogOpen}
                      location={dict.dashboard.locations.bali}
                      dict={dict}
                      lang={lang}
                    />
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="past">
              <PastVacations dict={dict} lang={lang} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="container py-8 border-t mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-bold">{dict.dashboard.mobileApp.getApp}</h2>
              <p className="text-muted-foreground">{dict.dashboard.mobileApp.description}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-4">
                <Button className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
                    <path d="m12 19-7 3V8a7 7 0 0 1 7-7" />
                    <path d="m12 19 7 3V8a7 7 0 0 0-7-7" />
                  </svg>
                  {dict.dashboard.mobileApp.appStore}
                </Button>
                <Button className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="3 3, 21 12, 3 21" />
                  </svg>
                  {dict.dashboard.mobileApp.googlePlay}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center border rounded-lg p-4 bg-gray-50">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-xs text-gray-500">QR Code</span>
                </div>
                <p className="text-sm font-medium">{dict.dashboard.mobileApp.scanToDownload}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

