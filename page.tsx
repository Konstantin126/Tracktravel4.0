import { getDictionary } from "./dictionaries"
import VacationTrackerClient from "./components/vacation-tracker-client"
import { Suspense } from "react"

export default function VacationTracker({ params }: { params: { lang: string } }) {
  // Ensure we have a valid lang parameter
  const lang = params?.lang === "bg" ? "bg" : "en"

  // Get dictionary synchronously
  const dict = getDictionary(lang)

  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <VacationTrackerClient params={params} dict={dict} />
    </Suspense>
  )
}

