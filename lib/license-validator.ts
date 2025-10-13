"use client"

const VALID_LICENSES = {
  basic: ["PO-2025-BASIC-001", "PO-2025-BASIC-002"],
  trial: "PO-2025-BASIC-003",
  upgrade: "PO-2025-PREMIUM-UPGRADE",
  autoTrading: "PO-2025-AUTO-TRADE-PRO",
}

export function validateLicense(licenseKey: string): {
  valid: boolean
  type: "basic" | "trial" | "upgrade" | "autoTrading" | null
} {
  const normalizedKey = licenseKey.trim().toUpperCase()

  if (VALID_LICENSES.basic.map((l) => l.toUpperCase()).includes(normalizedKey)) {
    return { valid: true, type: "basic" }
  }

  if (normalizedKey === VALID_LICENSES.trial.toUpperCase()) {
    return { valid: true, type: "trial" }
  }

  if (normalizedKey === VALID_LICENSES.upgrade.toUpperCase()) {
    return { valid: true, type: "upgrade" }
  }

  if (normalizedKey === VALID_LICENSES.autoTrading.toUpperCase()) {
    return { valid: true, type: "autoTrading" }
  }

  return { valid: false, type: null }
}
