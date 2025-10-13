"use client"

const USAGE_LIMIT = 3
const TRIAL_LICENSE_KEY = "PO-2025-BASIC-003"

export function getUsageCount(licenseKey: string): number {
  if (typeof window === "undefined") return 0
  const storageKey = `license_usage_${licenseKey.toUpperCase()}`
  const count = localStorage.getItem(storageKey)
  return count ? Number.parseInt(count, 10) : 0
}

export function incrementUsageCount(licenseKey: string): number {
  if (typeof window === "undefined") return 0
  const storageKey = `license_usage_${licenseKey.toUpperCase()}`
  const currentCount = getUsageCount(licenseKey)
  const newCount = currentCount + 1
  localStorage.setItem(storageKey, newCount.toString())
  return newCount
}

export function hasUsageRemaining(licenseKey: string): boolean {
  const normalizedKey = licenseKey.trim().toUpperCase()
  if (normalizedKey !== TRIAL_LICENSE_KEY.toUpperCase()) {
    return true // Other licenses have unlimited usage
  }
  return getUsageCount(licenseKey) < USAGE_LIMIT
}

export function getRemainingUsage(licenseKey: string): number {
  const normalizedKey = licenseKey.trim().toUpperCase()
  if (normalizedKey !== TRIAL_LICENSE_KEY.toUpperCase()) {
    return Number.POSITIVE_INFINITY // Other licenses have unlimited usage
  }
  return Math.max(0, USAGE_LIMIT - getUsageCount(licenseKey))
}
