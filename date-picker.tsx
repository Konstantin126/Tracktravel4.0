"use client"
import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { bg, enUS } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  startDate: Date
  endDate: Date
  setDateRange: (startDate: Date, endDate: Date) => void
  lang: string
  label?: string
}

export function DatePicker({ startDate, endDate, setDateRange, lang, label }: DatePickerProps) {
  // Set locale based on language
  const locale = lang === "bg" ? bg : enUS

  // State for temporary date selection
  const [tempStartDate, setTempStartDate] = useState<Date | undefined>(startDate)
  const [tempEndDate, setTempEndDate] = useState<Date | undefined>(endDate)
  const [calendarOpen, setCalendarOpen] = useState(false)

  // Format date based on language
  const formatDate = (date: Date) => {
    if (lang === "bg") {
      return format(date, "d MMMM yyyy", { locale })
    }
    return format(date, "MMMM d, yyyy", { locale })
  }

  // Handle date selection
  const handleSelect = (date: Date | undefined) => {
    if (!date) return

    if (!tempStartDate || (tempStartDate && tempEndDate)) {
      setTempStartDate(date)
      setTempEndDate(undefined)
    } else if (date < tempStartDate) {
      setTempStartDate(date)
      setTempEndDate(tempStartDate)
    } else {
      setTempEndDate(date)
    }
  }

  // Apply selected date range
  const applyDateRange = () => {
    if (tempStartDate && tempEndDate) {
      setDateRange(tempStartDate, tempEndDate)
      setCalendarOpen(false)
    }
  }

  // Format display text
  const displayText = () => {
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`
    }
    return label || (lang === "bg" ? "Изберете период" : "Select date range")
  }

  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal border-gray-200 hover:bg-gray-50",
            !startDate && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
          <span className="truncate">{displayText()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 shadow-lg" align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-700">
            {lang === "bg" ? "Изберете период" : "Select date range"}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {lang === "bg" ? "Кликнете върху начална и крайна дата" : "Click to select start and end dates"}
          </p>
        </div>
        <Calendar
          mode="range"
          defaultMonth={tempStartDate}
          selected={{
            from: tempStartDate,
            to: tempEndDate,
          }}
          onSelect={(range) => {
            if (range?.from) setTempStartDate(range.from)
            if (range?.to) setTempEndDate(range.to)
          }}
          initialFocus={false}
          locale={locale}
          className="rounded-md border-0"
        />
        <div className="p-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {tempStartDate && tempEndDate ? (
              <span>
                {formatDate(tempStartDate)} - {formatDate(tempEndDate)}
              </span>
            ) : tempStartDate ? (
              <span>{lang === "bg" ? "Изберете крайна дата" : "Select end date"}</span>
            ) : (
              <span>{lang === "bg" ? "Изберете начална дата" : "Select start date"}</span>
            )}
          </div>
          <Button
            onClick={applyDateRange}
            disabled={!tempStartDate || !tempEndDate}
            size="sm"
            className="bg-primary hover:bg-primary/90"
          >
            {lang === "bg" ? "Потвърди" : "Apply"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

