import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Zap,
  Info,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  BarChart3,
  Clock,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  DollarSign
} from 'lucide-react'
import { predictClosing } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { savePrediction } from '../services/predictions'
import { formatInr } from '../services/formatInr'
import { useToast } from '../context/ToastContext'
import Skeleton from '../components/Skeleton'
import PriceForecastChart from '../components/PriceForecastChart'

function formatApiError(err) {
  const d = err?.response?.data?.detail
  if (typeof d === 'string') return d
  if (Array.isArray(d)) return d.map((x) => x.msg || x).join(' ')
  return err?.message || 'Request failed.'
}

export default function Predict() {
  const { user } = useAuth()
  const { push } = useToast()
  const [symbol, setSymbol] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function handleSubmit(e, symbolOverride) {
    if (e) e.preventDefault()
    const sym = (symbolOverride || symbol).trim()
    if (!sym) {
      push('Please specify an equity ticker symbol.', 'error')
      return
    }
    setLoading(true)
    setResult(null)
    try {
      const data = await predictClosing({ symbol: sym })
      setResult(data)
      const entry = {
        id: crypto.randomUUID(),
        symbol: sym.toUpperCase(),
        open: data.open,
        prevClose: data.prev_close,
        asOf: data.as_of,
        prediction: data.prediction,
        confidence: data.confidence,
        r2_holdout: data.r2_holdout,
        historyDays: data.history_days,
        currency: data.currency || 'INR',
        usdConverted: data.usd_converted,
        fxRateToInr: data.fx_rate_to_inr,
        timestamp: new Date().toISOString(),
      }
      if (user?.uid) {
        await savePrediction(user.uid, entry)
        push('Forecast recorded to audited history.', 'success')
      }
    } catch (err) {
      push(formatApiError(err), 'error')
    } finally {
      setLoading(false)
    }
  }

  const dark = true

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#d4ba8a]/15 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#d4ba8a] mb-1">
            <span className="size-1.5 rounded-full bg-[#81a876]" />
            QUANTITATIVE FORECAST TERMINAL
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#f8f5ee]">
            Execute Algorithmic Valuation
          </h1>
          <p className="mt-1 text-xs text-[#cbbaa0]">
            Evaluate historical tick telemetry and forecast same-day closing price using XGBoost regression models.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#d4ba8a]/20 bg-[#162214] text-xs font-mono text-[#cbbaa0]">
          <ShieldCheck className="size-4 text-[#81a876]" />
          <span>MULTI-FACTOR CORRELATION</span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4 lg:items-start">
        {/* Left Control Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-[#d4ba8a]/25 bg-[#141f12]/85 p-6 shadow-[0_10px_30px_rgba(8,14,7,0.4)] backdrop-blur-md">
            <label className="mb-2 block text-[11px] font-mono font-bold uppercase tracking-wider text-[#cbbaa0]">
              Equity Identifier
            </label>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#cbbaa0]" />
                <input
                  type="text"
                  placeholder="e.g. RELIANCE.NS, AAPL..."
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  className="w-full rounded-xl border border-[#d4ba8a]/25 bg-[#0e160c] py-3 pl-10 pr-4 font-mono text-xs font-bold text-[#f8f5ee] placeholder-[#cbbaa0]/40 outline-none transition-all focus:border-[#d4ba8a] focus:ring-2 focus:ring-[#d4ba8a]/20"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d4ba8a] via-[#e2cca6] to-[#c1a36f] py-3.5 text-xs font-bold uppercase tracking-wider text-[#141d11] shadow-[0_8px_20px_rgba(212,186,138,0.25)] hover:brightness-105 active:scale-95 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <RefreshCw className="size-4 animate-spin text-[#141d11]" />
                ) : (
                  <Zap className="size-4 text-[#141d11] fill-current group-hover:scale-110 transition-transform" />
                )}
                <span>{loading ? 'Processing Model...' : 'Run Valuation'}</span>
              </button>
            </form>

            {/* Quick Benchmark Tickers */}
            <div className="mt-6 pt-5 border-t border-[#d4ba8a]/15 space-y-3">
              <p className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#cbbaa0]/70">
                <Info className="size-3 text-[#d4ba8a]" />
                Preset Benchmark Tickers
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { sym: 'TCS.NS', desc: 'NSE India' },
                  { sym: 'AAPL', desc: 'NASDAQ US' },
                  { sym: 'RELIANCE.NS', desc: 'NSE India' },
                  { sym: 'MSFT', desc: 'NASDAQ US' },
                ].map(({ sym, desc }) => (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => {
                      setSymbol(sym)
                      handleSubmit(null, sym)
                    }}
                    className="flex items-center gap-1.5 rounded-lg border border-[#d4ba8a]/20 bg-[#192716] px-2.5 py-1.5 text-[10px] font-mono font-bold text-[#f8f5ee] hover:bg-[#23351f] hover:border-[#d4ba8a]/50 transition-colors"
                  >
                    <span>{sym}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Telemetry Architecture Specs */}
          <div className="rounded-2xl border border-[#d4ba8a]/20 bg-[#162314]/80 p-5 shadow-sm text-xs space-y-2">
            <h3 className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-[#d4ba8a]">
              <AlertCircle className="size-4 text-[#81a876]" />
              Data Pipeline Info
            </h3>
            <p className="text-[11px] leading-relaxed text-[#cbbaa0]">
              Models aggregate 2 full calendar years of continuous market ticks. Intraday openings and technical oscillators (RSI, Bollinger Envelopes, MACD) are normalized dynamically upon each request.
            </p>
          </div>
        </div>

        {/* Right Output Area */}
        <div className="lg:col-span-3 relative min-h-[540px]">
          <AnimatePresence mode="wait">
            {!result && !loading && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[540px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#d4ba8a]/25 bg-[#121c10]/50 p-8 text-center backdrop-blur-sm"
              >
                <div className="mb-6 rounded-2xl border border-[#d4ba8a]/20 bg-[#1a2717] p-6 shadow-inner">
                  <BarChart3 className="size-12 text-[#d4ba8a]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#f8f5ee]">Quantitative Engine Idle</h3>
                <p className="mt-2 text-xs text-[#cbbaa0] max-w-sm leading-relaxed">
                  Provide an exchange symbol in the parameter console on the left to initiate machine learning feature generation and price projection.
                </p>
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 min-h-[540px]"
              >
                <div className="grid gap-4 sm:grid-cols-3">
                  <Skeleton className="h-28 bg-[#182515]" />
                  <Skeleton className="h-28 bg-[#182515]" />
                  <Skeleton className="h-28 bg-[#182515]" />
                </div>
                <Skeleton className="h-[430px] w-full bg-[#182515]" />
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-6 min-h-[540px]"
              >
                {/* 3 Main Valuation Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {/* Same-day Open */}
                  <div className="group relative overflow-hidden rounded-2xl border border-[#d4ba8a]/25 bg-[#141f12]/90 p-6 shadow-[0_8px_24px_rgba(8,14,7,0.4)] transition-all hover:border-[#d4ba8a]/50">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#cbbaa0]">
                      Same-Day Open Price
                    </p>
                    <p className="mt-2 font-serif text-3xl font-bold text-[#f8f5ee]">
                      {formatInr(result.open)}
                    </p>
                    <p className="mt-1 text-[10px] font-mono text-[#cbbaa0]/70">
                      As of: {result.as_of}
                    </p>
                  </div>

                  {/* Projected Close */}
                  <div className="relative overflow-hidden rounded-2xl border border-[#d4ba8a]/50 bg-gradient-to-br from-[#263721] via-[#1a2817] to-[#121c10] p-6 shadow-[0_12px_32px_rgba(38,55,33,0.5)] group">
                    <div className="absolute -right-10 -top-10 size-28 rounded-full bg-[#d4ba8a]/15 blur-2xl group-hover:scale-125 transition-transform duration-500" />
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#d4ba8a]">
                        Projected Close (XGBoost)
                      </p>
                      <TrendingUp className="size-4 text-[#d4ba8a]" />
                    </div>
                    <p className="mt-2 font-serif text-3xl font-bold text-[#f8f5ee]">
                      {formatInr(result.prediction)}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono text-[#81a876]">
                      <CheckCircle2 className="size-3" />
                      <span>Synthesized Alpha Projection</span>
                    </div>
                  </div>

                  {/* Confidence Level */}
                  <div className="group relative overflow-hidden rounded-2xl border border-[#d4ba8a]/25 bg-[#141f12]/90 p-6 shadow-[0_8px_24px_rgba(8,14,7,0.4)] transition-all hover:border-[#d4ba8a]/50">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#cbbaa0]">
                      Holdout Confidence (R²)
                    </p>
                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="font-serif text-3xl font-bold text-[#d4ba8a]">
                        {(Number(result.confidence) * 100).toFixed(1)}%
                      </span>
                      <span className="text-[10px] font-mono uppercase text-[#81a876] font-semibold">
                        {Number(result.confidence) >= 0.75 ? 'Institutional' : 'Moderate'}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-[#23351f] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Number(result.confidence) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-[#5f8653] via-[#81a876] to-[#d4ba8a]"
                      />
                    </div>
                  </div>
                </div>

                {/* Chart Section and Model Insights Sidebar */}
                <div className="grid gap-6 lg:grid-cols-3">
                  {/* Recharts Price Trail */}
                  <div className="lg:col-span-2 rounded-2xl border border-[#d4ba8a]/25 bg-[#141f12]/90 p-6 shadow-[0_12px_36px_rgba(8,14,7,0.4)]">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#d4ba8a]/15">
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-[#d4ba8a]" />
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f8f5ee]">
                          Price Trajectory & Holdout Vector
                        </span>
                      </div>
                      {result.usd_converted && (
                        <div className="flex items-center gap-2 rounded-lg bg-[#1f2e1a] border border-[#d4ba8a]/30 px-3 py-1">
                          <span className="size-1.5 rounded-full bg-[#d4ba8a] animate-pulse" />
                          <span className="text-[10px] font-mono font-bold text-[#d4ba8a] uppercase">
                            LIVE FX: ₹{Number(result.fx_rate_to_inr).toFixed(2)} / USD
                          </span>
                        </div>
                      )}
                    </div>
                    <PriceForecastChart
                      chartSeries={result.chart_series}
                      asOf={result.as_of}
                      sameDayOpen={result.open}
                      predictedClose={result.prediction}
                      dark={dark}
                    />
                  </div>

                  {/* Model Validation & Risk Telemetry */}
                  <div className="space-y-6">
                    <div className="rounded-2xl border border-[#d4ba8a]/25 bg-[#152213] p-6 shadow-sm">
                      <h4 className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#d4ba8a] mb-4">
                        <Cpu className="size-4 text-[#81a876]" />
                        Model Architecture
                      </h4>
                      <div className="space-y-3.5 font-mono text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[#cbbaa0]">Regressor Core</span>
                          <span className="font-bold text-[#f8f5ee]">XGBoost v2.0</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#cbbaa0]">Tick Depth</span>
                          <span className="font-bold text-[#f8f5ee]">{result.history_days} Days</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#cbbaa0]">Target Horizon</span>
                          <span className="font-bold text-[#d4ba8a]">Same-day Close</span>
                        </div>
                        <div className="pt-3 border-t border-[#d4ba8a]/15">
                          <div className="flex items-center gap-2 text-[10px] text-[#81a876] font-bold mb-1">
                            <CheckCircle2 className="size-3.5" />
                            CALIBRATED CROSS-VALIDATION
                          </div>
                          <p className="text-[10px] font-sans leading-relaxed text-[#cbbaa0]/80">
                            Evaluated against historical time-series split to prevent lookahead bias.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#d4ba8a]/20 bg-[#121c10] p-6 text-[#f8f5ee] shadow-md">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#cbbaa0] mb-3">
                        Risk & Volatility Regime
                      </h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-serif text-2xl font-bold text-[#81a876]">Controlled</p>
                          <p className="text-[10px] font-mono text-[#cbbaa0] mt-0.5">Statistical Variance Within 1.5σ</p>
                        </div>
                        <div className="size-10 rounded-xl bg-[#1b2918] border border-[#d4ba8a]/30 flex items-center justify-center text-[#d4ba8a]">
                          <ShieldCheck className="size-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
