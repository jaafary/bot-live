"use client"

import { useState, useEffect } from "react"
import { LicenseValidation } from "@/components/license-validation"
import { TradingBot } from "@/components/trading-bot"
import type { Language } from "@/lib/translations"

export default function Home() {
  const [isLicensed, setIsLicensed] = useState(false)
  const [isUpgrade, setIsUpgrade] = useState(false)
  const [hasAutoTrading, setHasAutoTrading] = useState(false)
  const [isTrial, setIsTrial] = useState(false)
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const license = localStorage.getItem("pocket_option_license")
    const licenseType = localStorage.getItem("pocket_option_license_type")
    const savedLanguage = localStorage.getItem("pocket_option_language") as Language

    if (license && licenseType) {
      setIsLicensed(true)
      setIsTrial(licenseType === "trial")
      setIsUpgrade(licenseType === "upgrade" || licenseType === "autoTrading" || licenseType === "trial")
      setHasAutoTrading(licenseType === "autoTrading")
      setLanguage(savedLanguage || "en")
    }
  }, [])

  const handleValidLicense = (upgrade: boolean, autoTrading: boolean, lang: Language) => {
    const licenseType = localStorage.getItem("pocket_option_license_type")
    setIsUpgrade(upgrade)
    setHasAutoTrading(autoTrading)
    setIsTrial(licenseType === "trial")
    setLanguage(lang)
    setIsLicensed(true)
  }

  return (
    <main className="min-h-screen bg-background">
      {!isLicensed ? (
        <LicenseValidation onValidLicense={handleValidLicense} />
      ) : (
        <TradingBot isUpgrade={isUpgrade} hasAutoTrading={hasAutoTrading} isTrial={isTrial} language={language} />
      )}
    </main>
  )
}
