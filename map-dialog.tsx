"use client"

import { useState } from "react"
import { FormDialog } from "@/app/[lang]/components/ui/form-dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Map, Navigation, Route } from "lucide-react"
import type { Dictionary } from "../dictionaries"

interface MapDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  location: string
  dict: Dictionary
  lang: string
}

export default function MapDialog({ open, onOpenChange, location, dict, lang }: MapDialogProps) {
  const [mapProvider, setMapProvider] = useState<"google" | "apple">("google")
  const [downloadingOfflineMap, setDownloadingOfflineMap] = useState(false)
  const [routeCreated, setRouteCreated] = useState(false)

  // Функция за симулиране на изтегляне на офлайн карта
  const handleDownloadOfflineMap = () => {
    setDownloadingOfflineMap(true)
    setTimeout(() => {
      setDownloadingOfflineMap(false)
      // Показване на съобщение за успешно изтегляне
      alert(lang === "bg" ? "Офлайн картата е изтеглена успешно!" : "Offline map downloaded successfully!")
    }, 2000)
  }

  // Функция за симулиране на създаване на маршрут
  const handleCreateRoute = () => {
    setRouteCreated(true)
    // Показване на съобщение за успешно създаден маршрут
    alert(lang === "bg" ? "Маршрутът е създаден успешно!" : "Route created successfully!")
  }

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={lang === "bg" ? "Карта и маршрути" : "Map & Routes"}
      description={
        lang === "bg" ? `Управлявайте карти и маршрути за ${location}` : `Manage maps and routes for ${location}`
      }
      className="sm:max-w-[550px]"
    >
      <Tabs defaultValue="view" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="view">
            <Map className="h-4 w-4 mr-2" />
            {lang === "bg" ? "Преглед" : "View"}
          </TabsTrigger>
          <TabsTrigger value="route">
            <Route className="h-4 w-4 mr-2" />
            {lang === "bg" ? "Маршрут" : "Route"}
          </TabsTrigger>
          <TabsTrigger value="offline">
            <Download className="h-4 w-4 mr-2" />
            {lang === "bg" ? "Офлайн" : "Offline"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="view" className="space-y-4 py-4">
          <div className="aspect-video w-full overflow-hidden rounded-md border bg-muted">
            <div className="h-full w-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <Map className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  {lang === "bg" ? "Карта на" : "Map of"} {location}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMapProvider("google")}
                className={mapProvider === "google" ? "bg-primary text-primary-foreground" : ""}
              >
                Google Maps
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMapProvider("apple")}
                className={mapProvider === "apple" ? "bg-primary text-primary-foreground" : ""}
              >
                Apple Maps
              </Button>
            </div>

            <Button>{lang === "bg" ? "Отвори в приложението" : "Open in App"}</Button>
          </div>
        </TabsContent>

        <TabsContent value="route" className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start">{lang === "bg" ? "Начална точка" : "Starting Point"}</Label>
              <Input id="start" defaultValue={lang === "bg" ? "Моето местоположение" : "My Location"} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="destination">{lang === "bg" ? "Дестинация" : "Destination"}</Label>
              <Input id="destination" defaultValue={location} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="waypoints">{lang === "bg" ? "Междинни точки" : "Waypoints"}</Label>
              <Input id="waypoints" placeholder={lang === "bg" ? "Добави междинна точка" : "Add waypoint"} />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="avoid-tolls" />
              <Label htmlFor="avoid-tolls" className="text-sm font-normal">
                {lang === "bg" ? "Избягвай платени пътища" : "Avoid toll roads"}
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="avoid-highways" />
              <Label htmlFor="avoid-highways" className="text-sm font-normal">
                {lang === "bg" ? "Избягвай магистрали" : "Avoid highways"}
              </Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">{lang === "bg" ? "Изчисти" : "Clear"}</Button>
            <Button onClick={handleCreateRoute}>
              <Navigation className="h-4 w-4 mr-2" />
              {routeCreated
                ? lang === "bg"
                  ? "Маршрутът е създаден"
                  : "Route Created"
                : lang === "bg"
                  ? "Създай маршрут"
                  : "Create Route"}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="offline" className="space-y-4 py-4">
          <div className="rounded-md border p-4 bg-muted/50">
            <h3 className="font-medium mb-2">{lang === "bg" ? "Изтегли офлайн карта" : "Download Offline Map"}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {lang === "bg"
                ? "Изтеглете карта за използване без интернет връзка. Това ще използва приблизително 50MB от вашето устройство."
                : "Download a map for use without an internet connection. This will use approximately 50MB of your device storage."}
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="high-detail" />
                <Label htmlFor="high-detail" className="text-sm font-normal">
                  {lang === "bg" ? "Висока детайлност" : "High detail"}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="include-poi" defaultChecked />
                <Label htmlFor="include-poi" className="text-sm font-normal">
                  {lang === "bg" ? "Включи забележителности" : "Include points of interest"}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="include-transit" />
                <Label htmlFor="include-transit" className="text-sm font-normal">
                  {lang === "bg" ? "Включи обществен транспорт" : "Include transit info"}
                </Label>
              </div>
            </div>
          </div>

          <Button className="w-full" onClick={handleDownloadOfflineMap} disabled={downloadingOfflineMap}>
            {downloadingOfflineMap ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {lang === "bg" ? "Изтегляне..." : "Downloading..."}
              </span>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                {lang === "bg" ? "Изтегли офлайн карта" : "Download Offline Map"}
              </>
            )}
          </Button>
        </TabsContent>
      </Tabs>
    </FormDialog>
  )
}

