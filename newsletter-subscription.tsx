"use client"

import type React from "react"

import { useState } from "react"
import { Check, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FormDialog } from "@/app/[lang]/components/ui/form-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import type { Dictionary } from "../dictionaries"

interface NewsletterSubscriptionProps {
  dict: Dictionary
  lang: string
}

export default function NewsletterSubscription({ dict, lang }: NewsletterSubscriptionProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [frequency, setFrequency] = useState("weekly")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubscribed(true)
      setOpen(false)

      // Show success toast
      toast({
        title: dict.dashboard.newsletter.successMessage,
        description: email,
      })

      // In a real app, you would send this data to your backend
      console.log({
        email,
        frequency,
        categories: selectedCategories,
      })
    }, 1000)
  }

  const categories = [
    { id: "adventure", label: dict.dashboard.newsletter.categories.adventure },
    { id: "cultural", label: dict.dashboard.newsletter.categories.cultural },
    { id: "beach", label: dict.dashboard.newsletter.categories.beach },
    { id: "city", label: dict.dashboard.newsletter.categories.city },
    { id: "cruise", label: dict.dashboard.newsletter.categories.cruise },
    { id: "mountain", label: dict.dashboard.newsletter.categories.mountain },
    { id: "luxury", label: dict.dashboard.newsletter.categories.luxury },
    { id: "budget", label: dict.dashboard.newsletter.categories.budget },
  ]

  return (
    <>
      <Button
        variant={isSubscribed ? "outline" : "default"}
        className="flex items-center gap-2"
        onClick={() => setOpen(true)}
      >
        {isSubscribed ? (
          <>
            <Check className="h-4 w-4" />
            {dict.dashboard.newsletter.manageSubscription}
          </>
        ) : (
          <>
            <Mail className="h-4 w-4" />
            {dict.dashboard.newsletter.subscribe}
          </>
        )}
      </Button>

      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title={dict.dashboard.newsletter.preferences}
        description={dict.dashboard.newsletter.description}
        className="sm:max-w-[500px]"
      >
        <form onSubmit={handleSubmit} noValidate className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">{dict.dashboard.newsletter.email}</Label>
            <Input
              id="email"
              type="email"
              placeholder={dict.dashboard.newsletter.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-3">
            <Label>{dict.dashboard.newsletter.tourTypes}</Label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>{dict.dashboard.newsletter.frequency}</Label>
            <RadioGroup value={frequency} onValueChange={setFrequency} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily" className="text-sm font-normal cursor-pointer">
                  {dict.dashboard.newsletter.daily}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly" className="text-sm font-normal cursor-pointer">
                  {dict.dashboard.newsletter.weekly}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly" className="text-sm font-normal cursor-pointer">
                  {dict.dashboard.newsletter.monthly}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={!email || selectedCategories.length === 0 || isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-1">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {lang === "bg" ? "Изпращане..." : "Submitting..."}
                </span>
              ) : lang === "bg" ? (
                "Абонирай се"
              ) : (
                "Subscribe"
              )}
            </Button>
          </div>
        </form>
      </FormDialog>
    </>
  )
}

