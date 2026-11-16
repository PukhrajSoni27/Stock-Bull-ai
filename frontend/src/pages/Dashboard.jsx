import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TrendingUp, History, Zap, Activity, Globe, ShieldCheck, Compass, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { formatStoredField } from '../services/formatInr'
import ChartPlaceholder from '../components/ChartPlaceholder'
import { subscribePredictions } from '../services/predictions'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 }
}

function StatCard({ title, value, hint, icon: Icon, badgeText, badgeColor = "text-[#d4ba8a]" }) {
  return (
    <motion.div
      variants={item}
      className="group relative overflow-hidden rounded-2xl border border-[#d4ba8a]/20 bg-[#141f12]/80 p-6 shadow-[0_8px_24px_rgba(8,14,7,0.4)] backdrop-blur-md transition-all hover:border-[#d4ba8a]/45 hover:bg-[#192716]"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex size-11 items-center justify-center rounded-xl bg-[#23331e] border border-[#d4ba8a]/30 text-[#d4ba8a] shadow-inner transition-transform group-hover:scale-105">
          <Icon className="size-5" />
        </div>
        {badgeText && (
          <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#1b2a17] border border-[#d4ba8a]/20 ${badgeColor}`}>
            {badgeText}
          </span>
        )}
      </div>
      <p className="text-[11px] font-mono uppercase tracking-wider text-[#cbbaa0]/80">{title}</p>
      <p className="mt-1.5 font-serif text-3xl font-bold text-[#f8f5ee]">{value}</p>
      {hint && (
        <p className="mt-2 text-[10px] font-mono text-[#cbbaa0]/70 flex items-center gap-1.5">
          <span className="size-1 rounded-full bg-[#81a876]" />
          {hint}
        </p>
      )}
    </motion.div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const [predictions, setPredictions] = useState([])

  useEffect(() => {
    if (!user?.uid) return undefined
    return subscribePredictions(user.uid, setPredictions, () => setPredictions([]))
  }, [user?.uid])

  const total = predictions.length
  const avgConf =
    total > 0
      ? Math.round(
          (predictions.reduce((s, p) => s + (Number(p.confidence) || 0), 0) / total) * 100,
        )
      : null
  const recent = predictions.slice(0, 5)

  // Calculate weekly runs (last 7 days)
  const [weeklyStats, setWeeklyStats] = useState({ weeklyRuns: 0, weeklyGoal: 10, weeklyProgress: 0 })

  useEffect(() => {
    const calculateWeeklyStats = () => {
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      const weeklyRuns = predictions.filter(p => new Date(p.timestamp) >= oneWeekAgo).length
      const weeklyGoal = Math.max(10, Math.ceil(weeklyRuns / 0.6))
      const weeklyProgress = Math.min(100, Math.round((weeklyRuns / weeklyGoal) * 100))
      setWeeklyStats({ weeklyRuns, weeklyGoal, weeklyProgress })
    }

    calculateWeeklyStats()
    const interval = setInterval(calculateWeeklyStats, 60000)
    return () => clearInterval(interval)
  }, [predictions])

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Executive Welcome Bar */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-[#d4ba8a]/15 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#d4ba8a] mb-1">
            <span className="size-1.5 rounded-full bg-[#81a876]" />
            EXECUTIVE INTELLIGENCE OVERVIEW
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#f8f5ee]">
            Portfolio Terminal · <span className="text-gradient-gold">{user?.name || 'Institutional Client'}</span>
          </h1>
          <p className="mt-1 text-xs text-[#cbbaa0] font-sans">
            System status operational. Real-time quantitative models primed for closing valuations.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/predict"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#d4ba8a] via-[#e2cca6] to-[#c1a36f] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#141d11] shadow-[0_8px_24px_rgba(212,186,138,0.25)] hover:brightness-105 active:scale-95 transition-all"
          >
            <Zap className="size-3.5 text-[#141d11] fill-current" />
            <span>Generate New Forecast</span>
            <ArrowUpRight className="size-4 text-[#141d11] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </motion.div>

      {/* KPI Stat Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Audit Volume" 
          value={total} 
          icon={TrendingUp} 
          hint="Total model runs logged"
          badgeText="Active"
        />
        <StatCard 
          title="Mean R² Confidence" 
          value={avgConf != null ? `${avgConf}%` : '—'} 
          icon={Zap} 
          hint="Holdout predictive strength"
          badgeText={avgConf ? (avgConf >= 85 ? "Optimal" : "Standard") : "No Data"}
          badgeColor="text-[#81a876]"
        />
        <StatCard 
          title="Market Baskets" 
          value="NSE · US" 
          icon={Globe} 
          hint="Multi-currency FX routing"
          badgeText="Global"
          badgeColor="text-[#d4ba8a]"
        />
        <StatCard 
          title="Model Integrity" 
          value="Optimal" 
          icon={ShieldCheck} 
          hint="XGBoost + GB fallback"
          badgeText="100% SLA"
          badgeColor="text-[#81a876]"
        />
      </div>

      {/* Main Grid: Visuals and Activities */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Visual Market Pulse & Desk Advisory */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div variants={item} className="rounded-2xl border border-[#d4ba8a]/20 bg-[#141f12]/80 p-8 shadow-[0_12px_36px_rgba(8,14,7,0.4)] backdrop-blur-md">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#d4ba8a]">
                  Dynamic Technical Dispersion
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#f8f5ee] mt-0.5">
                  Market Pulse & Volatility Index
                </h2>
                <p className="text-xs text-[#cbbaa0] mt-1">Multi-frequency volume and price oscillator activity simulation.</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[#d4ba8a]/25 bg-[#1b2b18] px-3.5 py-1.5">
                <Activity className="size-3.5 text-[#81a876] animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#d4ba8a]">Live Feed</span>
              </div>
            </div>
            
            <div className="w-full">
              <ChartPlaceholder />
            </div>
          </motion.div>

          {/* Institutional Advisory Note */}
          <motion.div variants={item} className="rounded-2xl border border-[#d4ba8a]/25 bg-gradient-to-br from-[#1a2617] via-[#141f12] to-[#0f170d] p-7 text-[#f8f5ee] shadow-lg">
             <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#d4ba8a] mb-2">
               <Compass className="size-4 text-[#81a876]" />
               Desk Execution Protocol
             </div>
             <h3 className="font-serif text-lg font-bold">Standard Equity Identifiers</h3>
             <p className="mt-2 text-xs text-[#cbbaa0] leading-relaxed">
               For Indian securities on the National Stock Exchange use suffix <span className="text-[#d4ba8a] font-mono font-bold bg-[#1d2d19] px-2 py-0.5 rounded border border-[#d4ba8a]/30">.NS</span> (e.g. <span className="text-[#f8f5ee] font-mono">RELIANCE.NS</span>, <span className="text-[#f8f5ee] font-mono">TCS.NS</span>). For Bombay Stock Exchange, affix <span className="text-[#d4ba8a] font-mono font-bold bg-[#1d2d19] px-2 py-0.5 rounded border border-[#d4ba8a]/30">.BO</span>.
             </p>
             <p className="mt-2.5 text-xs text-[#cbbaa0] leading-relaxed">
               For US equities (e.g. <span className="text-[#f8f5ee] font-mono">AAPL</span>, <span className="text-[#f8f5ee] font-mono">NVDA</span>, <span className="text-[#f8f5ee] font-mono">MSFT</span>), the system automatically performs real-time foreign exchange translation into INR alongside USD values.
             </p>
          </motion.div>
        </div>

        {/* Right Column: Recent Audits & Quota Gauge */}
        <motion.div variants={item}>
          <div className="h-full rounded-2xl border border-[#d4ba8a]/20 bg-[#141f12]/80 p-6 shadow-[0_12px_36px_rgba(8,14,7,0.4)] backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#d4ba8a]/15">
                 <div>
                   <h2 className="font-serif text-lg font-bold text-[#f8f5ee]">Recent Audit Trail</h2>
                   <p className="text-[10px] font-mono text-[#cbbaa0]/80">Latest predictive computations</p>
                 </div>
                 <Link to="/history" className="text-xs font-mono font-bold uppercase tracking-wider text-[#d4ba8a] hover:text-[#f8f5ee] transition-colors flex items-center gap-1">
                   <span>Full Log</span>
                   <ArrowUpRight className="size-3" />
                 </Link>
              </div>
              
              {recent.length === 0 ? (
                <div className="flex h-[320px] flex-col items-center justify-center text-center p-6">
                  <div className="mb-4 rounded-2xl bg-[#1b2b18] border border-[#d4ba8a]/20 p-5 shadow-inner">
                    <History className="size-8 text-[#cbbaa0]" />
                  </div>
                  <p className="font-serif text-base font-bold text-[#f8f5ee]">No Computations Recorded</p>
                  <p className="mt-1 text-xs text-[#cbbaa0] max-w-[200px]">
                    Submit an equity ticker to commence algorithmic forecasting.
                  </p>
                  <Link 
                    to="/predict" 
                    className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-[#d4ba8a] to-[#c1a36f] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#141d11] transition-transform hover:scale-105"
                  >
                    Execute First Run
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recent.map((p) => (
                    <div
                      key={p.id}
                      className="group flex items-center justify-between rounded-xl border border-[#d4ba8a]/15 bg-[#172415]/70 p-3.5 transition-all hover:bg-[#1f311c] hover:border-[#d4ba8a]/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-[#24351f] border border-[#d4ba8a]/30 font-mono text-xs font-bold text-[#d4ba8a]">
                          {p.symbol.substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-mono text-xs font-bold text-[#f8f5ee] group-hover:text-[#d4ba8a] transition-colors">
                            {p.symbol}
                          </p>
                          <p className="text-[10px] font-mono text-[#cbbaa0]/70 uppercase">
                            {new Date(p.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-xs font-bold text-[#f8f5ee]">
                          {formatStoredField(p, 'prediction')}
                        </p>
                        <div className="mt-1 flex items-center justify-end gap-1.5">
                          <div className="h-1 w-10 rounded-full bg-[#273a22] overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#81a876] to-[#d4ba8a]" 
                              style={{ width: `${Math.round(p.confidence * 100)}%` }} 
                            />
                          </div>
                          <span className="text-[9px] font-mono text-[#cbbaa0]">
                            {Math.round(p.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Weekly Target Gauge */}
            <div className="pt-6 mt-6 border-t border-[#d4ba8a]/15">
               <div className="rounded-xl border border-[#d4ba8a]/20 bg-[#162214] p-4 text-[#f8f5ee]">
                  <div className="flex items-center justify-between mb-1.5">
                     <p className="text-[10px] font-mono font-bold text-[#cbbaa0] uppercase tracking-wider">
                       Weekly Forecast Quota
                     </p>
                     <span className="text-xs font-mono text-[#d4ba8a] font-bold">
                       {weeklyStats.weeklyProgress}%
                     </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                     <p className="font-mono text-[#f8f5ee]">{weeklyStats.weeklyRuns} / {weeklyStats.weeklyGoal} Analyses</p>
                     <span className="text-[10px] font-mono text-[#81a876] uppercase">Calibrated</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#22331d] overflow-hidden p-0.5 border border-[#d4ba8a]/15">
                     <div 
                       className="h-full bg-gradient-to-r from-[#5f8653] via-[#81a876] to-[#d4ba8a] rounded-full transition-all duration-500" 
                       style={{ width: `${weeklyStats.weeklyProgress}%` }} 
                     />
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
