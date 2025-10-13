"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Lock, Globe, MessageCircle, Phone } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Language, getTranslation } from "@/lib/translations"
import { validateLicense } from "@/lib/license-validator"
import { initializeTrialTimerIfNeeded } from "@/lib/trial-timer"
import { hasUsageRemaining, incrementUsageCount } from "@/lib/license-usage-tracker"

interface LicenseValidationProps {
  onValidLicense: (isUpgrade: boolean, hasAutoTrading: boolean, language: Language) => void
}

export function LicenseValidation({ onValidLicense }: LicenseValidationProps) {
  const [licenseKey, setLicenseKey] = useState("")
  const [error, setError] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [language, setLanguage] = useState<Language>("en")

  const t = getTranslation(language)

  const handleValidate = () => {
    setError("")
    setIsValidating(true)

    // Simulate validation delay
    setTimeout(() => {
      const result = validateLicense(licenseKey)

      if (result.valid && result.type) {
        if (!hasUsageRemaining(licenseKey)) {
          setError(t.usageLimitReached)
          setIsValidating(false)
          return
        }

        incrementUsageCount(licenseKey)

        localStorage.setItem("pocket_option_license", "HIDDEN")
        localStorage.setItem("pocket_option_license_type", result.type)
        localStorage.setItem("pocket_option_language", language)
        localStorage.setItem("pocket_option_license_key", licenseKey.trim().toUpperCase())

        if (result.type === "trial") {
          initializeTrialTimerIfNeeded()
        }

        onValidLicense(
          result.type === "upgrade" || result.type === "autoTrading" || result.type === "trial",
          result.type === "autoTrading",
          language,
        )
      } else {
        setError(t.invalidLicense)
      }

      setIsValidating(false)
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleValidate()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">{t.appTitle}</CardTitle>
          <CardDescription className="text-base">{t.enterLicense}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>{t.selectLanguage}</span>
            </div>
            <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="lt">Lietuvių</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t.licensePlaceholder}
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 font-mono text-sm"
                disabled={isValidating}
                dir={language === "ar" ? "rtl" : "ltr"}
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button onClick={handleValidate} className="w-full" disabled={!licenseKey.trim() || isValidating}>
            {isValidating ? t.validating : t.activateLicense}
          </Button>

          <div className="pt-4 border-t space-y-3">
            <p className="text-sm font-medium text-center text-muted-foreground">{t.needHelp}</p>
            <div className="flex flex-col gap-2">
              <a
                href="https://t.me/tayloreedbot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Telegram: @tayloreedbot</span>
              </a>
              <a
                href="https://wa.me/16166664722"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">WhatsApp: +1 (616) 666-4722</span>
              </a>
              <a
                href="https://t.me/17703808982"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Telegram: +1 (770) 380-8982</span>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
