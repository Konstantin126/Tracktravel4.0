import "server-only"

// Define the dictionary structure
export interface Dictionary {
  metadata: {
    title: string
    description: string
  }
  navigation: {
    dashboard: string
    bookings: string
    wishlist: string
    support: string
    getMobileApp: string
  }
  transportation: {
    plane: string
    train: string
    ship: string
    bus: string
    car: string
    walking: string
    motorcycle: string
  }
  dashboard: {
    welcome: string
    trackVacations: string
    exploreDestinations: string
    tabs: {
      upcoming: string
      active: string
      past: string
    }
    vacationStatus: {
      confirmed: string
      pending: string
      inProgress: string
      completed: string
      departureIn: string
      days: string
      day: string
      of: string
    }
    actions: {
      viewDetails: string
      viewItinerary: string
      viewPhotos: string
      review: string
      selectDate: string
    }
    mobileApp: {
      getApp: string
      description: string
      appStore: string
      googlePlay: string
      scanToDownload: string
    }
    photoGallery: {
      title: string
      description: string
      addPhotos: string
      view: string
    }
    vacations: {
      greekIslandsCruise: string
      alpineSkiResort: string
      tokyoAdventure: string
      baliBeachResort: string
      parisWeekend: string
      newYorkCity: string
    }
    locations: {
      athens: string
      chamonix: string
      tokyo: string
      bali: string
      paris: string
      newYork: string
    }
    dates: {
      greekIslandsCruise: string
      alpineSkiResort: string
      tokyoAdventure: string
      baliBeachResort: string
      parisWeekend: string
      newYorkCity: string
    }
  }
  vacationDetails: {
    backToDashboard: string
    cruiseVacation: string
    status: {
      confirmed: string
      downloadDocuments: string
      contactAgent: string
    }
    tabs: {
      overview: string
      itinerary: string
      accommodations: string
      documents: string
    }
    overview: {
      description: string
      included: string
      notIncluded: string
    }
    itinerary: {
      day: string
    }
    accommodations: {
      cabinAmenities: string
    }
    documents: {
      bookingConfirmation: string
      bookingDetails: string
      eTickets: string
      ticketsAndPasses: string
      travelInsurance: string
      insurancePolicy: string
      excursionVouchers: string
      excursionDetails: string
      download: string
    }
    sidebar: {
      vacationStatus: string
      paymentInformation: string
      totalCost: string
      depositPaid: string
      remainingBalance: string
      dueDate: string
      makePayment: string
      travelAgent: string
      seniorConsultant: string
      sendMessage: string
      scheduleCall: string
      weatherForecast: string
      averageTemperatures: string
      mobileApp: string
      mobileAppDescription: string
    }
  }
}

// Import dictionaries directly to avoid dynamic imports
import en from "./dictionaries/en.json"
import bg from "./dictionaries/bg.json"

// Create a cache to store dictionaries
const dictionaries = {
  en,
  bg,
}

// Use a synchronous function to get the dictionary
export function getDictionary(locale: string): Dictionary {
  if (locale !== "en" && locale !== "bg") {
    locale = "en"
  }
  return dictionaries[locale]
}

