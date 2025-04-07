"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Maximize2, ImageIcon, Plus, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FormDialog } from "@/app/[lang]/components/ui/form-dialog"
import type { Dictionary } from "../dictionaries"

interface PhotoGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  vacationName: string
  dict: Dictionary
  lang?: string
}

export default function PhotoGalleryModal({
  isOpen,
  onClose,
  vacationName,
  dict,
  lang = "en",
}: PhotoGalleryModalProps) {
  // Initialize with empty array instead of placeholder images
  const [photos, setPhotos] = useState<string[]>([])

  // State for photo preview dialog
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState("")
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(-1)

  // State for full-size image view
  const [fullSizeView, setFullSizeView] = useState(false)

  const handleAddPhotos = (files: FileList) => {
    try {
      // In a real app, you would upload the files to a server
      // For now, we'll just create local URLs for the images
      const newPhotos = Array.from(files)
        .map((file) => {
          try {
            return URL.createObjectURL(file)
          } catch (error) {
            console.error("Error creating object URL:", error)
            return ""
          }
        })
        .filter((url) => url !== "") // Filter out any empty URLs

      setPhotos([...photos, ...newPhotos])
    } catch (error) {
      console.error("Error handling files:", error)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      handleAddPhotos(files)
      // Reset the input value so the same file can be selected again
      event.target.value = ""
    }
  }

  const deletePhoto = (index: number) => {
    const newPhotos = [...photos]
    newPhotos.splice(index, 1)
    setPhotos(newPhotos)

    // If we're deleting the currently previewed photo, close the preview dialog
    if (index === selectedPhotoIndex) {
      setPreviewDialogOpen(false)
    }
  }

  const openPhotoPreview = (photo: string, index: number) => {
    setSelectedPhoto(photo)
    setSelectedPhotoIndex(index)
    setPreviewDialogOpen(true)
  }

  const openFullSize = () => {
    setPreviewDialogOpen(false)
    setFullSizeView(true)
  }

  const downloadPhoto = () => {
    try {
      // Create a temporary link element
      const link = document.createElement("a")
      link.href = selectedPhoto
      link.download = `vacation-photo-${selectedPhotoIndex + 1}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading photo:", error)
      alert(lang === "bg" ? "Грешка при изтегляне на снимката" : "Error downloading the photo")
    }
  }

  // Add this effect to clean up blob URLs when component unmounts
  useEffect(() => {
    // Clean up function to revoke object URLs when component unmounts
    return () => {
      // Only revoke URLs that are blob URLs (not the placeholder)
      photos.forEach((photo) => {
        if (photo.startsWith("blob:")) {
          try {
            URL.revokeObjectURL(photo)
          } catch (error) {
            console.error("Error revoking object URL:", error)
          }
        }
      })
    }
  }, [photos])

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-4xl" onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center justify-between">
              <span>
                {dict.dashboard.photoGallery.title}: {vacationName}
              </span>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <div className="mb-4 text-center">
              <p className="text-muted-foreground">{dict.dashboard.photoGallery.description}</p>
            </div>

            {photos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => openPhotoPreview(photo, index)}
                  >
                    <img
                      src={photo || "/placeholder.svg"}
                      alt={`Vacation photo ${index + 1}`}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        console.error(`Failed to load image: ${photo}`)
                        // Fall back to placeholder if image fails to load
                        e.currentTarget.src = "/placeholder.svg?height=300&width=400"
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-white text-sm font-medium">
                        {lang === "bg" ? "Кликнете за преглед" : "Click to view"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">
                  {lang === "bg" ? "Няма снимки" : "No photos"}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {lang === "bg"
                    ? "Добавете снимки, като кликнете върху бутона по-долу"
                    : "Add photos by clicking the button below"}
                </p>
                <div className="mt-6">
                  <Button
                    onClick={() => document.getElementById("photo-upload")?.click()}
                    className="flex items-center gap-2 mx-auto"
                  >
                    <Plus className="h-4 w-4" />
                    {dict.dashboard.photoGallery.addPhotos}
                  </Button>
                </div>
              </div>
            )}

            {photos.length > 0 && (
              <div className="mt-4 flex justify-center">
                <Button
                  onClick={() => document.getElementById("photo-upload")?.click()}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {dict.dashboard.photoGallery.addPhotos}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Photo Preview Dialog */}
      <FormDialog
        open={previewDialogOpen}
        onOpenChange={setPreviewDialogOpen}
        title={lang === "bg" ? "Преглед на снимка" : "Photo Preview"}
        className="sm:max-w-3xl"
      >
        <div className="flex flex-col items-center">
          <div className="relative w-full max-h-[60vh] overflow-hidden rounded-md mb-4">
            <img
              src={selectedPhoto || "/placeholder.svg"}
              alt="Selected photo"
              className="w-full h-auto object-contain mx-auto"
              onError={(e) => {
                console.error(`Failed to load image: ${selectedPhoto}`)
                e.currentTarget.src = "/placeholder.svg?height=600&width=800"
              }}
            />
          </div>

          <div className="flex gap-2 justify-center w-full">
            <Button variant="outline" className="flex items-center gap-2" onClick={openFullSize}>
              <Maximize2 className="h-4 w-4" />
              {lang === "bg" ? "Виж в пълен изглед" : "View Full Size"}
            </Button>

            <Button variant="outline" className="flex items-center gap-2" onClick={downloadPhoto}>
              <Download className="h-4 w-4" />
              {lang === "bg" ? "Изтегли" : "Download"}
            </Button>

            <Button
              variant="destructive"
              className="flex items-center gap-2"
              onClick={() => {
                deletePhoto(selectedPhotoIndex)
                setPreviewDialogOpen(false)
              }}
            >
              <Trash2 className="h-4 w-4" />
              {lang === "bg" ? "Премахни" : "Remove"}
            </Button>
          </div>
        </div>
      </FormDialog>

      {/* Full-size image modal */}
      {fullSizeView && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setFullSizeView(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 text-white border-white hover:bg-black/70"
              onClick={() => setFullSizeView(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <img
              src={selectedPhoto || "/placeholder.svg"}
              alt="Full size view"
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                console.error(`Failed to load full-size image: ${selectedPhoto}`)
                e.currentTarget.src = "/placeholder.svg?height=600&width=800"
              }}
            />
          </div>
        </div>
      )}
      {/* Скрит input за добавяне на снимки */}
      <input type="file" id="photo-upload" onChange={handleFileChange} accept="image/*" multiple className="hidden" />
    </>
  )
}

