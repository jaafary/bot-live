"use client"

const SIGNAL_LIMIT = 7
const TRIAL_LICENSE_KEY = "PO-2025-BASIC-003"

export function getSignalCount(licenseKey: string): number {
  if (typeof window === "undefined") return 0
  const storageKey = `license_signals_${licenseKey.toUpperCase()}`
  const count = localStorage.getItem(storageKey)
  return count ? Number.parseInt(count, 10) : 0
}

export function incrementSignalCount(licenseKey: string): number {
  if (typeof window === "undefined") return 0
  const storageKey = `license_signals_${licenseKey.toUpperCase()}`
  const currentCount = getSignalCount(licenseKey)
  const newCount = currentCount + 1
  localStorage.setItem(storageKey, newCount.toString())
  return newCount
}

export function hasSignalsRemaining(licenseKey: string): boolean {
  const normalizedKey = licenseKey.trim().toUpperCase()
  if (normalizedKey !== TRIAL_LICENSE_KEY.toUpperCase()) {
    return true // Other licenses have unlimited signals
  }
  return getSignalCount(licenseKey) < SIGNAL_LIMIT
}

export function getRemainingSignals(licenseKey: string): number {
  const normalizedKey = licenseKey.trim().toUpperCase()
  if (normalizedKey !== TRIAL_LICENSE_KEY.toUpperCase()) {
    return Number.POSITIVE_INFINITY // Other licenses have unlimited signals
  }
  return Math.max(0, SIGNAL_LIMIT - getSignalCount(licenseKey))
}
