"use client"

const TRIAL_DURATION_MINUTES = 40 // Reduced trial duration from 150 minutes to 40 minutes

export interface TrialStatus {
  isActive: boolean
  remainingMinutes: number
  remainingSeconds: number
  isExpired: boolean
  startTime: number
}

export function initializeTrialTimerIfNeeded(): number {
  const existingStartTime = localStorage.getItem("pocket_option_trial_start")

  if (existingStartTime) {
    // Timer already exists, return existing start time
    return Number.parseInt(existingStartTime)
  }

  // No existing timer, create new one
  const startTime = Date.now()
  localStorage.setItem("pocket_option_trial_start", startTime.toString())
  return startTime
}

export function initializeTrialTimer(): number {
  const startTime = Date.now()
  localStorage.setItem("pocket_option_trial_start", startTime.toString())
  return startTime
}

export function getTrialStatus(): TrialStatus {
  const startTimeStr = localStorage.getItem("pocket_option_trial_start")

  if (!startTimeStr) {
    return {
      isActive: false,
      remainingMinutes: TRIAL_DURATION_MINUTES,
      remainingSeconds: 0,
      isExpired: false,
      startTime: 0,
    }
  }

  const startTime = Number.parseInt(startTimeStr)
  const now = Date.now()
  const elapsedMs = now - startTime
  const elapsedMinutes = Math.floor(elapsedMs / 60000)
  const remainingMinutes = Math.max(0, TRIAL_DURATION_MINUTES - elapsedMinutes)
  const remainingSeconds = Math.max(0, Math.floor((TRIAL_DURATION_MINUTES * 60000 - elapsedMs) / 1000) % 60)
  const isExpired = elapsedMinutes >= TRIAL_DURATION_MINUTES

  return {
    isActive: true,
    remainingMinutes,
    remainingSeconds,
    isExpired,
    startTime,
  }
}

export function clearTrialTimer(): void {
  localStorage.removeItem("pocket_option_trial_start")
}
