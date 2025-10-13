"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  LogOut,
  Play,
  Square,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Settings,
  Activity,
  Sparkles,
  Zap,
  Target,
  Lock,
  Unlock,
  Radio,
  Clock,
  ArrowUp,
  ArrowDown,
  Loader2,
  Globe,
  Users,
  SignalIcon,
  TrendingUpIcon,
} from "lucide-react"
import { type Language, getTranslation } from "@/lib/translations"
import { getTrialStatus, clearTrialTimer, type TrialStatus } from "@/lib/trial-timer"
import { getRemainingUsage } from "@/lib/license-usage-tracker"
import { hasSignalsRemaining, incrementSignalCount, getRemainingSignals } from "@/lib/signal-tracker"

type BotStatus = "idle" | "analyzing" | "running" | "waiting"
type TradeDirection = "call" | "put"
type Strategy = 1 | 2 | 3 | null

interface Trade {
  id: string
  time: string
  direction: TradeDirection
  amount: number
  result: "win" | "loss" | "pending"
  profit: number
}

interface TradingBotProps {
  isUpgrade: boolean
  hasAutoTrading: boolean
  isTrial: boolean
  language: Language
}

const CURRENCY_PAIRS = [
  "EUR/USD OTC",
  "GBP/USD OTC",
  "USD/JPY OTC",
  "AUD/USD OTC",
  "USD/CAD OTC",
  "EUR/GBP OTC",
  "EUR/JPY OTC",
  "GBP/JPY OTC",
]

export function TradingBot({ isUpgrade, hasAutoTrading, isTrial, language }: TradingBotProps) {
  const t = getTranslation(language)

  const [botStatus, setBotStatus] = useState<BotStatus>("idle")
  const [balance, setBalance] = useState(10000)
  const [tradeAmount, setTradeAmount] = useState(10)
  const [timeframe, setTimeframe] = useState("60")
  const [autoTrade, setAutoTrade] = useState(false)
  const [riskLevel, setRiskLevel] = useState([50])
  const [trades, setTrades] = useState<Trade[]>([])
  const [stats, setStats] = useState({
    totalTrades: 0,
    wins: 0,
    losses: 0,
    profit: 0,
    todayProfit: 0,
    weeklyProfit: 0,
    monthlyProfit: 0,
  })

  const [currentSignal, setCurrentSignal] = useState<{
    pair: string
    direction: TradeDirection
    duration: number
    strength: number
    timestamp: Date
    expiresAt: Date
  } | null>(null)
  const [strategy, setStrategy] = useState<Strategy>(null)
  const [showStrategyDialog, setShowStrategyDialog] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisStep, setAnalysisStep] = useState("")
  const [nextSignalCountdown, setNextSignalCountdown] = useState(0)
  const [signalTimeRemaining, setSignalTimeRemaining] = useState(0)
  const [trialStatus, setTrialStatus] = useState<TrialStatus>({
    remainingMinutes: 0,
    remainingSeconds: 0,
    isExpired: false,
  })
  const [remainingUsage, setRemainingUsage] = useState<number>(0)
  const [remainingSignals, setRemainingSignals] = useState<number>(0)

  const signalTimerRef = useRef<NodeJS.Timeout | null>(null)
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null)

  const [globalStats, setGlobalStats] = useState({
    totalUsers: 542,
    activeUsers: 277,
    todayWinRate: 87.5,
    todaySignals: 1247,
  })

  const handleLogout = () => {
    localStorage.removeItem("pocket_option_license")
    localStorage.removeItem("pocket_option_license_type")
    localStorage.removeItem("pocket_option_language")
    if (isTrial) {
      clearTrialTimer()
    }
    window.location.reload()
  }

  const generateSignal = (): {
    pair: string
    direction: TradeDirection
    duration: number
    strength: number
    timestamp: Date
    expiresAt: Date
  } => {
    const pair = CURRENCY_PAIRS[Math.floor(Math.random() * CURRENCY_PAIRS.length)]
    const direction: TradeDirection = Math.random() > 0.5 ? "call" : "put"
    const durations = [60, 180, 300] // 1 min, 3 mins, 5 mins
    const duration = durations[Math.floor(Math.random() * durations.length)]

    // Strength based on strategy
    let baseStrength = 70
    if (strategy === 1) baseStrength = 80 // Conservative = higher strength
    if (strategy === 3) baseStrength = 65 // Aggressive = lower strength but higher potential

    const strength = baseStrength + Math.floor(Math.random() * 15)
    const timestamp = new Date()
    const expiresAt = new Date(timestamp.getTime() + duration * 1000)

    return { pair, direction, duration, strength, timestamp, expiresAt }
  }

  const runAnalysis = async () => {
    if (isTrial) {
      const licenseKey = localStorage.getItem("pocket_option_license_key")
      if (licenseKey && !hasSignalsRemaining(licenseKey)) {
        alert(t.signalLimitReached)
        handleLogout()
        return
      }
    }

    setBotStatus("analyzing")
    setAnalysisProgress(0)

    const steps = [
      { text: t.scanningPairs, duration: 2000, progress: 33 },
      { text: t.calculatingProbability, duration: 2000, progress: 66 },
      { text: t.generatingSignal, duration: 1500, progress: 100 },
    ]

    for (const step of steps) {
      setAnalysisStep(step.text)
      await new Promise((resolve) => {
        const interval = setInterval(
          () => {
            setAnalysisProgress((prev) => {
              const next = prev + 2
              if (next >= step.progress) {
                clearInterval(interval)
                resolve(null)
                return step.progress
              }
              return next
            })
          },
          step.duration / ((step.progress - analysisProgress) / 2),
        )
      })
    }

    // Generate and show signal
    const signal = generateSignal()
    setCurrentSignal(signal)
    setBotStatus("running")
    setSignalTimeRemaining(signal.duration)

    if (isTrial) {
      const licenseKey = localStorage.getItem("pocket_option_license_key")
      if (licenseKey) {
        incrementSignalCount(licenseKey)
        const remaining = getRemainingSignals(licenseKey)
        setRemainingSignals(remaining)
      }
    }

    // Start signal timer
    if (signalTimerRef.current) clearInterval(signalTimerRef.current)
    signalTimerRef.current = setInterval(() => {
      setSignalTimeRemaining((prev) => {
        if (prev <= 1) {
          if (signalTimerRef.current) clearInterval(signalTimerRef.current)
          // Signal expired, wait 5 minutes before next
          setBotStatus("waiting")
          setNextSignalCountdown(300) // 5 minutes
          startCountdown()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Auto-execute if auto-trading is enabled
    if (autoTrade && hasAutoTrading) {
      setTimeout(() => {
        executeTrade(signal.direction)
      }, 1000)
    }
  }

  const startCountdown = () => {
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current)
    countdownTimerRef.current = setInterval(() => {
      setNextSignalCountdown((prev) => {
        if (prev <= 1) {
          if (countdownTimerRef.current) clearInterval(countdownTimerRef.current)
          // Start new analysis
          runAnalysis()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const startBot = () => {
    if (!strategy) {
      setShowStrategyDialog(true)
    } else {
      runAnalysis()
    }
  }

  const stopBot = () => {
    setBotStatus("idle")
    setAutoTrade(false)
    setCurrentSignal(null)
    setNextSignalCountdown(0)
    if (signalTimerRef.current) clearInterval(signalTimerRef.current)
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current)
  }

  const handleStrategySelect = (selectedStrategy: Strategy) => {
    setStrategy(selectedStrategy)
    setShowStrategyDialog(false)
    runAnalysis()
  }

  const executeTrade = (direction: TradeDirection) => {
    if (balance < tradeAmount) {
      alert("Insufficient balance!")
      return
    }

    const newTrade: Trade = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString(),
      direction,
      amount: tradeAmount,
      result: "pending",
      profit: 0,
    }

    setTrades((prev) => [newTrade, ...prev.slice(0, 19)])
    setBalance((prev) => prev - tradeAmount)

    setTimeout(() => {
      // Win rate based on signal strength and strategy
      let winChance = 0.55
      if (currentSignal) {
        winChance = currentSignal.strength / 100
      }
      if (strategy === 1) winChance += 0.05 // Conservative boost
      if (strategy === 3) winChance -= 0.05 // Aggressive penalty

      const isWin = Math.random() < winChance
      const profitMultiplier = strategy === 3 ? 0.95 : strategy === 1 ? 0.75 : 0.85
      const profit = isWin ? tradeAmount * profitMultiplier : -tradeAmount

      setTrades((prev) =>
        prev.map((t) => (t.id === newTrade.id ? { ...t, result: isWin ? "win" : "loss", profit } : t)),
      )

      setBalance((prev) => prev + (isWin ? tradeAmount + profit : 0))
      setStats((prev) => ({
        ...prev,
        totalTrades: prev.totalTrades + 1,
        wins: prev.wins + (isWin ? 1 : 0),
        losses: prev.losses + (isWin ? 0 : 1),
        profit: prev.profit + profit,
        todayProfit: prev.todayProfit + profit,
        weeklyProfit: prev.weeklyProfit + profit,
        monthlyProfit: prev.monthlyProfit + profit,
      }))
    }, Number.parseInt(timeframe) * 1000)
  }

  // Cleanup timers
  useEffect(() => {
    // Animate win rate between 85-90% every 3 minutes
    const winRateInterval = setInterval(() => {
      setGlobalStats((prev) => ({
        ...prev,
        todayWinRate: 85 + Math.random() * 5, // Random between 85-90
      }))
    }, 180000) // 3 minutes

    // Increment signals every 30 seconds
    const signalsInterval = setInterval(() => {
      setGlobalStats((prev) => ({
        ...prev,
        todaySignals: prev.todaySignals + Math.floor(Math.random() * 5) + 1, // Add 1-5 signals
      }))
    }, 30000) // 30 seconds

    // Update active users slightly every minute
    const usersInterval = setInterval(() => {
      setGlobalStats((prev) => ({
        ...prev,
        activeUsers: Math.max(250, Math.min(300, prev.activeUsers + Math.floor(Math.random() * 11) - 5)), // Fluctuate ±5
      }))
    }, 60000) // 1 minute

    return () => {
      if (signalTimerRef.current) clearInterval(signalTimerRef.current)
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current)
      clearInterval(winRateInterval)
      clearInterval(signalsInterval)
      clearInterval(usersInterval)
    }
  }, [])

  const winRate = stats.totalTrades > 0 ? ((stats.wins / stats.totalTrades) * 100).toFixed(1) : "0.0"

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    if (!isTrial) return

    // Update trial status every second
    const updateTrialStatus = () => {
      const status = getTrialStatus()
      setTrialStatus(status)

      // If expired, logout user
      if (status.isExpired) {
        alert("Your trial period has expired. Please upgrade to continue using the bot.")
        handleLogout()
      }
    }

    // Initial update
    updateTrialStatus()

    // Update every second
    const trialInterval = setInterval(updateTrialStatus, 1000)

    return () => clearInterval(trialInterval)
  }, [isTrial])

  useEffect(() => {
    if (!isTrial) return

    const licenseKey = localStorage.getItem("pocket_option_license_key")
    if (licenseKey) {
      const remaining = getRemainingUsage(licenseKey)
      setRemainingUsage(remaining)
      const signals = getRemainingSignals(licenseKey)
      setRemainingSignals(signals)
    }
  }, [isTrial])

  return (
    <div className="min-h-screen bg-background" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-lg bg-card/80">
        <div className="mx-auto max-w-7xl px-3 py-3 sm:px-4 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate flex items-center gap-2">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                {t.appTitle}
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 truncate flex items-center gap-1">
                {hasAutoTrading ? (
                  <>
                    <Sparkles className="h-3 w-3 text-yellow-500" />
                    <span className="text-yellow-500 font-semibold">AUTO-TRADE PRO</span>
                  </>
                ) : isTrial ? (
                  <>
                    <Clock className="h-3 w-3 text-orange-500" />
                    <span className="text-orange-500 font-semibold">
                      Trial: {trialStatus.remainingMinutes}:{trialStatus.remainingSeconds.toString().padStart(2, "0")} |{" "}
                      {remainingUsage} {remainingUsage === 1 ? "login" : "logins"} | {remainingSignals}{" "}
                      {t.signalsRemaining}
                    </span>
                  </>
                ) : isUpgrade ? (
                  <>
                    <Sparkles className="h-3 w-3 text-blue-500" />
                    <span className="text-blue-500 font-semibold">Premium License</span>
                  </>
                ) : (
                  "Basic License"
                )}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="shrink-0 bg-transparent">
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">{t.logout}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Upgrade Overlay for Basic License */}
      <div className="relative">
        {!isUpgrade && (
          <div className="absolute inset-0 z-40 flex items-center justify-center p-4">
            <div className="absolute inset-0 backdrop-blur-md bg-background/30" />
            <Card className="relative z-50 max-w-lg shadow-2xl border-2 border-primary/50">
              <CardHeader className="text-center space-y-3">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold">{t.upgradeTitle}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{t.upgradeDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm font-mono text-muted-foreground mb-2">Premium License Key:</p>
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-base sm:text-lg font-mono font-bold text-primary">PO-2025-</p>
                    <p className="text-base sm:text-lg font-mono font-bold text-primary blur-sm select-none">PRE</p>
                    <p className="text-base sm:text-lg font-mono font-bold text-muted-foreground">•••••••</p>
                    <p className="text-base sm:text-lg font-mono font-bold text-primary blur-sm select-none">-UPG</p>
                    <p className="text-base sm:text-lg font-mono font-bold text-primary">RADE</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className={!isUpgrade ? "pointer-events-none select-none" : ""}>
          <div className="mx-auto max-w-7xl p-3 sm:p-4 space-y-3 sm:space-y-4 pb-20 sm:pb-4">
            {isTrial && (
              <Card className="border-2 border-orange-500/50 bg-gradient-to-br from-orange-500/10 to-orange-600/5">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">Trial Period Active</p>
                        <p className="text-sm text-muted-foreground">Time remaining until expiration</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold font-mono text-orange-500">
                        {trialStatus.remainingMinutes}:{trialStatus.remainingSeconds.toString().padStart(2, "0")}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.floor(trialStatus.remainingMinutes / 60)}h {trialStatus.remainingMinutes % 60}m remaining
                      </p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <Progress value={(trialStatus.remainingMinutes / 40) * 100} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-orange-500/30">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Logins Remaining</span>
                      </div>
                      <Badge variant="outline" className="text-base font-bold border-orange-500/50 text-orange-500">
                        {remainingUsage} / 3
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-orange-500/30">
                      <div className="flex items-center gap-2">
                        <SignalIcon className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Signals Remaining</span>
                      </div>
                      <Badge variant="outline" className="text-base font-bold border-orange-500/50 text-orange-500">
                        {remainingSignals} / 7
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/30 overflow-hidden relative">
              <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
              <CardHeader className="p-4 sm:p-6 relative">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-5 w-5 text-primary animate-pulse" />
                  <CardTitle className="text-base sm:text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    CURRENT BOT STATUS AND PERFORMANCE WORLDWIDE
                  </CardTitle>
                </div>
                <CardDescription className="text-xs sm:text-sm">
                  Live statistics from all active users globally
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 relative">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {/* Total Users */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <p className="text-xs text-muted-foreground">Total Users</p>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-500 font-mono">
                      {globalStats.totalUsers.toLocaleString()}
                    </p>
                  </div>

                  {/* Active Users */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-green-500 animate-pulse" />
                      <p className="text-xs text-muted-foreground">Active Now</p>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-green-500 font-mono">
                      {globalStats.activeUsers.toLocaleString()}
                    </p>
                  </div>

                  {/* Today's Win Rate */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUpIcon className="h-4 w-4 text-purple-500" />
                      <p className="text-xs text-muted-foreground">Today's Win Rate</p>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-purple-500 font-mono">
                      {globalStats.todayWinRate.toFixed(1)}%
                    </p>
                    <div className="mt-2">
                      <Progress value={globalStats.todayWinRate} className="h-1.5" />
                    </div>
                  </div>

                  {/* Today's Signals */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <SignalIcon className="h-4 w-4 text-orange-500" />
                      <p className="text-xs text-muted-foreground">Signals Generated</p>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-orange-500 font-mono">
                      {globalStats.todaySignals.toLocaleString()}
                    </p>
                    <Badge variant="outline" className="mt-2 text-xs border-orange-500/30 text-orange-500">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                </div>

                {/* Additional Info Bar */}
                <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-muted-foreground">System Status: </span>
                      <span className="font-semibold text-green-500">Operational</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Today's Profit: </span>
                      <span className="font-mono font-bold">████ {t.confidential || "CONFIDENTIAL"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 shrink-0" />
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{t.balance}</p>
                  </div>
                  <p className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2 truncate text-green-500 font-mono blur-sm select-none">
                    {balance.toFixed(2)}
                  </p>
                  <p className="text-[9px] sm:text-xs text-muted-foreground mt-1">{t.confidential || "CONFIDENTIAL"}</p>
                </CardContent>
              </Card>

              <Card
                className={`bg-gradient-to-br ${stats.profit >= 0 ? "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20" : "from-red-500/10 to-red-600/5 border-red-500/20"}`}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <TrendingUp
                      className={`h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 ${stats.profit >= 0 ? "text-emerald-500" : "text-red-500"}`}
                    />
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{t.todayProfit}</p>
                  </div>
                  <p
                    className={`text-lg sm:text-2xl font-bold mt-1 sm:mt-2 truncate font-mono blur-sm select-none ${stats.profit >= 0 ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {stats.todayProfit.toFixed(2)}
                  </p>
                  <p className="text-[9px] sm:text-xs text-muted-foreground mt-1">{t.confidential || "CONFIDENTIAL"}</p>
                </CardContent>
              </Card>
            </div>

            {/* Live Signal Display */}
            {botStatus !== "idle" && (
              <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader className="p-3 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Radio className="h-5 w-5 text-primary animate-pulse" />
                      <CardTitle className="text-base sm:text-lg">{t.liveSignals}</CardTitle>
                    </div>
                    {strategy && (
                      <Badge variant="outline" className="text-xs">
                        {t.currentStrategy}: {strategy}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-6 pt-0 space-y-4">
                  {botStatus === "analyzing" && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <p className="text-sm font-medium">{analysisStep}</p>
                      </div>
                      <Progress value={analysisProgress} className="h-2" />
                    </div>
                  )}

                  {botStatus === "running" && currentSignal && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-card rounded-lg border-2 border-primary">
                        <div className="space-y-1">
                          <p className="text-2xl font-bold">{currentSignal.pair}</p>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={currentSignal.direction === "call" ? "default" : "destructive"}
                              className="text-sm"
                            >
                              {currentSignal.direction === "call" ? (
                                <>
                                  <ArrowUp className="h-4 w-4 mr-1" />
                                  {t.call}
                                </>
                              ) : (
                                <>
                                  <ArrowDown className="h-4 w-4 mr-1" />
                                  {t.put}
                                </>
                              )}
                            </Badge>
                            <Badge variant="outline" className="text-sm">
                              {formatTime(currentSignal.duration)}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{t.signalStrength}</p>
                          <p className="text-3xl font-bold text-primary">{currentSignal.strength}%</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-medium">{t.timeRemaining}</p>
                        </div>
                        <p className="text-lg font-bold font-mono">{formatTime(signalTimeRemaining)}</p>
                      </div>

                      {!autoTrade && (
                        <Button onClick={() => executeTrade(currentSignal.direction)} className="w-full h-12" size="lg">
                          <Target className="mr-2 h-5 w-5" />
                          Execute Trade Manually
                        </Button>
                      )}
                    </div>
                  )}

                  {botStatus === "waiting" && (
                    <div className="text-center space-y-3 py-6">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                      <p className="text-sm text-muted-foreground">{t.waitingForSignal}</p>
                      <p className="text-2xl font-bold font-mono">{formatTime(nextSignalCountdown)}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Tabs defaultValue="trading" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="trading" className="text-xs sm:text-sm">
                  {t.trading}
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-xs sm:text-sm">
                  {t.settings}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="trading" className="space-y-3 sm:space-y-4">
                {/* Bot Control */}
                <Card>
                  <CardHeader className="p-3 sm:p-6">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base sm:text-lg">{t.signalSystem}</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">{t.startStopTrading}</CardDescription>
                      </div>
                      <Badge
                        variant={botStatus === "running" || botStatus === "analyzing" ? "default" : "secondary"}
                        className="shrink-0 text-xs"
                      >
                        {botStatus === "running" || botStatus === "analyzing" ? t.running : t.stopped}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0">
                    <div className="flex gap-2">
                      {botStatus === "idle" ? (
                        <Button
                          onClick={startBot}
                          className="flex-1 h-12 sm:h-10 text-sm sm:text-base touch-manipulation bg-gradient-to-r from-primary to-primary/80"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          {t.startBot}
                        </Button>
                      ) : (
                        <Button
                          onClick={stopBot}
                          variant="destructive"
                          className="flex-1 h-12 sm:h-10 text-sm sm:text-base touch-manipulation"
                        >
                          <Square className="mr-2 h-4 w-4" />
                          {t.stopBot}
                        </Button>
                      )}
                    </div>

                    {/* Auto Trading Toggle */}
                    <div
                      className={`p-4 rounded-lg border-2 ${hasAutoTrading ? "bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/30" : "bg-muted border-muted-foreground/20"}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {hasAutoTrading ? (
                            <Unlock className="h-5 w-5 text-green-500" />
                          ) : (
                            <Lock className="h-5 w-5 text-muted-foreground" />
                          )}
                          <Label className="text-sm sm:text-base font-semibold">
                            {hasAutoTrading ? t.autoTradingUnlocked : t.autoTradingLocked}
                          </Label>
                        </div>
                        <Switch
                          checked={autoTrade}
                          onCheckedChange={setAutoTrade}
                          disabled={botStatus === "idle" || !hasAutoTrading}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {hasAutoTrading ? t.followingSignals : t.requiresAutoLicense}
                      </p>
                      {autoTrade && hasAutoTrading && (
                        <Badge variant="default" className="mt-2 text-xs">
                          <Zap className="h-3 w-3 mr-1" />
                          {t.autoTradingActive}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Manual Trading */}
                <Card>
                  <CardHeader className="p-3 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">{t.manualTrading}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">{t.executeManually}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0">
                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                      <Button
                        onClick={() => executeTrade("call")}
                        disabled={botStatus === "idle"}
                        className="h-24 sm:h-20 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 active:from-green-800 active:to-green-900 touch-manipulation"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <TrendingUp className="h-6 w-6 sm:h-6 sm:w-6" />
                          <span className="font-bold text-sm sm:text-base">{t.call}</span>
                        </div>
                      </Button>

                      <Button
                        onClick={() => executeTrade("put")}
                        disabled={botStatus === "idle"}
                        className="h-24 sm:h-20 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:from-red-800 active:to-red-900 touch-manipulation"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <TrendingDown className="h-6 w-6 sm:h-6 sm:w-6" />
                          <span className="font-bold text-sm sm:text-base">{t.put}</span>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-3 sm:space-y-4">
                <Card>
                  <CardHeader className="p-3 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">{t.tradingSettings}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">{t.configureBotParams}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6 pt-0">
                    <div className="space-y-2">
                      <Label className="text-sm sm:text-base">{t.tradeAmount}</Label>
                      <Input
                        type="number"
                        value={tradeAmount}
                        onChange={(e) => setTradeAmount(Number(e.target.value))}
                        min={1}
                        max={balance}
                        className="h-12 sm:h-10 text-base sm:text-sm"
                      />
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{t.amountPerTrade}</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm sm:text-base">{t.timeframe}</Label>
                      <Select value={timeframe} onValueChange={setTimeframe}>
                        <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 {t.seconds}</SelectItem>
                          <SelectItem value="60">1 {t.minute}</SelectItem>
                          <SelectItem value="120">2 {t.minutes}</SelectItem>
                          <SelectItem value="300">5 {t.minutes}</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{t.timeframeDuration}</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm sm:text-base">
                        {t.riskLevel}: {riskLevel[0]}%
                      </Label>
                      <Slider
                        value={riskLevel}
                        onValueChange={setRiskLevel}
                        min={0}
                        max={100}
                        step={5}
                        className="touch-manipulation"
                      />
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{t.adjustRisk}</p>
                    </div>

                    {strategy && (
                      <div className="space-y-2">
                        <Label className="text-sm sm:text-base">{t.currentStrategy}</Label>
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="font-semibold">
                            {strategy === 1 ? t.strategy1 : strategy === 2 ? t.strategy2 : t.strategy3}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {strategy === 1 ? t.strategy1Desc : strategy === 2 ? t.strategy2Desc : t.strategy3Desc}
                          </p>
                        </div>
                        <Button variant="outline" onClick={() => setShowStrategyDialog(true)} className="w-full">
                          Change Strategy
                        </Button>
                      </div>
                    )}

                    <div className="p-3 sm:p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg space-y-2 border border-primary/20">
                      <div className="flex items-center gap-2">
                        <Settings className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
                        <p className="text-xs sm:text-sm font-medium">{t.currentConfig}</p>
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground space-y-1">
                        <p>
                          {t.tradeAmount}: ${tradeAmount}
                        </p>
                        <p>
                          {t.timeframe}: {timeframe}s
                        </p>
                        <p>
                          {t.riskLevel}: {riskLevel[0]}%
                        </p>
                        <p>
                          {t.autoTrade}: {autoTrade ? t.enabled : t.disabled}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Strategy Selection Dialog */}
      <Dialog open={showStrategyDialog} onOpenChange={setShowStrategyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">{t.selectStrategy}</DialogTitle>
            <DialogDescription>{t.configureBotParams}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-auto p-4 flex flex-col items-start gap-2 hover:border-primary hover:bg-primary/5 bg-transparent"
              onClick={() => handleStrategySelect(1)}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-500 font-bold">1</span>
                </div>
                <span className="font-semibold">{t.strategy1}</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">{t.strategy1Desc}</p>
            </Button>

            <Button
              variant="outline"
              className="w-full h-auto p-4 flex flex-col items-start gap-2 hover:border-primary hover:bg-primary/5 bg-transparent"
              onClick={() => handleStrategySelect(2)}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-purple-500 font-bold">2</span>
                </div>
                <span className="font-semibold">{t.strategy2}</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">{t.strategy2Desc}</p>
            </Button>

            <Button
              variant="outline"
              className="w-full h-auto p-4 flex flex-col items-start gap-2 hover:border-primary hover:bg-primary/5 bg-transparent"
              onClick={() => handleStrategySelect(3)}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-500 font-bold">3</span>
                </div>
                <span className="font-semibold">{t.strategy3}</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">{t.strategy3Desc}</p>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
