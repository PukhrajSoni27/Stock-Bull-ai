import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  ShieldCheck, 
  BarChart3, 
  Globe2, 
  ArrowRight, 
  Zap, 
  Lock, 
  Scale, 
  ChevronRight,
  Database,
  Award,
  Layers
} from 'lucide-react'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d140b] text-[#f4efe6] selection:bg-[#5f8653]/40 selection:text-[#f8f5ee]">
      {/* Background Decorative Lighting Gradients */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[900px] rounded-full bg-gradient-to-b from-[#5f8653]/15 via-[#d4ba8a]/8 to-transparent blur-[160px]" />
      <div className="pointer-events-none absolute top-[30%] -right-40 size-[600px] rounded-full bg-[#3a5432]/18 blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 -left-40 size-[700px] rounded-full bg-[#d4ba8a]/8 blur-[180px]" />
      
      {/* Fine Background Grid */}
      <div className="pointer-events-none absolute inset-0 bg-subtle-grid opacity-70" />

      {/* Top Banner: Market Status */}
      <div className="relative z-50 border-b border-[#d4ba8a]/15 bg-[#121b10]/90 backdrop-blur-md px-6 py-2 text-center">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] font-mono text-[#cbbaa0]">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#81a876] animate-ping" />
            <span className="text-[#d4ba8a] font-semibold uppercase tracking-wider">
              CAPITAL INTELLIGENCE PLATFORM
            </span>
            <span className="hidden md:inline text-[#cbbaa0]/60">| NSE · BSE · NYSE · NASDAQ LIVE TELEMETRY</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[#cbbaa0]/90">
            <span>DATA INTEGRITY: 99.98%</span>
            <span>MODEL: XGBOOST REGIME</span>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex items-center gap-3.5">
          <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#3b5432] via-[#24351f] to-[#141e12] border border-[#d4ba8a]/40 text-[#f8f5ee] shadow-[0_4px_20px_rgba(36,53,31,0.5)]">
            <TrendingUp className="size-5 text-[#d4ba8a]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#f8f5ee]">
              StockVision<span className="text-[#d4ba8a]">.AI</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#cbbaa0]/80">
              Institutional Predictive Analytics
            </span>
          </div>
        </motion.div>
        
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex items-center gap-6">
          <Link 
            to="/login" 
            className="text-xs font-semibold uppercase tracking-wider text-[#cbbaa0] hover:text-[#f8f5ee] transition-colors"
          >
            Client Sign In
          </Link>
          <Link 
            to="/signup" 
            className="group relative inline-flex items-center gap-2 rounded-full border border-[#d4ba8a]/50 bg-gradient-to-r from-[#2c3f26] via-[#3a5432] to-[#2c3f26] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#f8f5ee] shadow-[0_4px_16px_rgba(20,30,18,0.5)] hover:border-[#d4ba8a] hover:shadow-[0_6px_24px_rgba(212,186,138,0.25)] transition-all active:scale-95"
          >
            <span>Open Terminal</span>
            <ArrowRight className="size-3.5 text-[#d4ba8a] transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-24 text-center lg:px-12 lg:pt-24 lg:pb-32">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="inline-flex items-center gap-2.5 rounded-full border border-[#d4ba8a]/30 bg-[#192516]/80 px-4 py-1.5 text-xs font-mono font-medium text-[#d4ba8a] backdrop-blur-md shadow-sm"
        >
           <ShieldCheck className="size-3.5 text-[#81a876]" />
           <span>INSTITUTIONAL QUANTITATIVE FORECASTING ENGINE</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-8 font-serif text-5xl font-bold tracking-tight text-[#f8f5ee] md:text-7xl lg:text-8xl max-w-5xl mx-auto leading-[1.08]"
        >
          Predict Market Regimes with <br className="hidden md:block" />
          <span className="text-gradient-gold">Uncompromising Precision.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 max-w-3xl mx-auto text-base leading-relaxed text-[#cbbaa0] md:text-xl font-sans"
        >
          Harnessing two years of continuous tick telemetry, 12+ multi-factor technical indicators, 
          and calibrated XGBoost models to forecast same-day closing valuations across Indian and global equity markets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/signup"
            className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#d4ba8a] via-[#e2cca6] to-[#c1a36f] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#141d11] shadow-[0_10px_30px_rgba(212,186,138,0.3)] hover:brightness-105 active:scale-95 transition-all"
          >
            <span>Launch Live Forecast</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/login"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-[#d4ba8a]/30 bg-[#162113]/80 px-7 py-4 text-sm font-bold uppercase tracking-wider text-[#f8f5ee] hover:bg-[#202e1b] hover:border-[#d4ba8a]/60 active:scale-95 transition-all"
          >
            <span>Sign In to Terminal</span>
          </Link>
        </motion.div>

        {/* Verification & Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[#cbbaa0]/80 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-[#d4ba8a]" />
            <span>Deterministic R² Holdout Validation</span>
          </div>
          <span className="hidden sm:inline text-[#d4ba8a]/30">•</span>
          <div className="flex items-center gap-2">
            <Lock className="size-4 text-[#d4ba8a]" />
            <span>Encrypted Portfolio Telemetry</span>
          </div>
          <span className="hidden sm:inline text-[#d4ba8a]/30">•</span>
          <div className="flex items-center gap-2">
            <Award className="size-4 text-[#d4ba8a]" />
            <span>Multi-Exchange Real-Time FX</span>
          </div>
        </div>

        {/* Real App Quantitative Benchmarks Bar */}
        <div className="mt-20 w-full rounded-2xl border border-[#d4ba8a]/20 bg-[#141e12]/80 p-8 shadow-[0_20px_50px_rgba(10,16,9,0.7)] backdrop-blur-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#d4ba8a]/15 text-center">
            <div className="pt-4 md:pt-0">
              <div className="font-serif text-3xl md:text-4xl font-bold text-[#f8f5ee]">2 Years</div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#cbbaa0] mt-1.5">
                Historical Depth Analysis
              </div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="font-serif text-3xl md:text-4xl font-bold text-[#d4ba8a]">12+ Factors</div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#cbbaa0] mt-1.5">
                Technical Alpha Signals
              </div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="font-serif text-3xl md:text-4xl font-bold text-[#f8f5ee]">XGBoost 2.0</div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#cbbaa0] mt-1.5">
                Gradient Boosting Regressor
              </div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="font-serif text-3xl md:text-4xl font-bold text-[#81a876]">INR · USD</div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#cbbaa0] mt-1.5">
                Native Multi-Currency FX
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Architecture & Features */}
      <section className="relative z-10 border-t border-[#d4ba8a]/15 bg-[#10180e]/90 px-6 py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4ba8a]/25 bg-[#1b2718] px-3.5 py-1 text-[11px] font-mono uppercase tracking-widest text-[#d4ba8a] mb-4">
              Quantitative Architecture
            </div>
            <h2 className="font-serif text-4xl font-bold text-[#f8f5ee] md:text-5xl">
              Engineered for Institutional Trust & Precision
            </h2>
            <p className="mt-4 text-base text-[#cbbaa0] leading-relaxed">
              Moving beyond speculative guesswork. Our models synthesize rigorous technical metrics 
              with time-series regression to project high-confidence closing prices.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
             {[
               { 
                 icon: BarChart3, 
                 title: "12+ Technical Indicators", 
                 tag: "MACD · RSI · BOLL",
                 desc: "Calculates exponential moving averages, relative strength index, Bollinger volatility envelopes, volume weighted momentum, and return variances." 
               },
               { 
                 icon: Database, 
                 title: "Live Market Telemetry", 
                 tag: "YAHOO FINANCE STREAM",
                 desc: "Sub-second tick ingestion with failover architecture and dynamic 2-year rolling window feature sets for robust predictive generalization." 
               },
               { 
                 icon: Globe2, 
                 title: "Cross-Market Coverage", 
                 tag: "NSE · BSE · GLOBAL",
                 desc: "Full native INR valuation for Indian tickers (.NS / .BO) paired with automated real-time USD/INR currency translation for global equities." 
               }
             ].map((f, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.12 }}
                 className="group relative flex flex-col justify-between rounded-2xl border border-[#d4ba8a]/20 bg-[#162214]/80 p-8 transition-all hover:border-[#d4ba8a]/50 hover:bg-[#1c2c19] shadow-[0_12px_32px_rgba(9,15,8,0.4)]"
               >
                 <div>
                   <div className="mb-6 flex items-center justify-between">
                     <div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#2c3f26] to-[#192516] border border-[#d4ba8a]/30 text-[#d4ba8a] shadow-inner">
                       <f.icon className="size-6" />
                     </div>
                     <span className="font-mono text-[10px] font-semibold tracking-wider text-[#d4ba8a] uppercase bg-[#1f2e1b] px-2.5 py-1 rounded-md border border-[#d4ba8a]/20">
                       {f.tag}
                     </span>
                   </div>
                   <h3 className="font-serif text-xl font-bold text-[#f8f5ee]">{f.title}</h3>
                   <p className="mt-3 text-sm leading-relaxed text-[#cbbaa0]">{f.desc}</p>
                 </div>
                 <div className="mt-8 pt-4 border-t border-[#d4ba8a]/10 flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-[#d4ba8a]">
                   <span>Audited Metric</span>
                   <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Security & Model Credibility Section */}
      <section className="relative z-10 border-t border-[#d4ba8a]/15 bg-[#0e160c] px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-[#d4ba8a]/30 bg-gradient-to-br from-[#1a2617] via-[#141f12] to-[#0f170d] p-10 md:p-14 shadow-2xl relative overflow-hidden">
            <div className="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-[#5f8653]/15 blur-3xl" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#d4ba8a] uppercase tracking-wider mb-3">
                  <ShieldCheck className="size-4 text-[#81a876]" />
                  Verified Predictive Framework
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#f8f5ee]">
                  Ready to deploy high-conviction market analysis?
                </h3>
                <p className="mt-4 text-sm md:text-base text-[#cbbaa0] leading-relaxed">
                  Join institutional analysts and discerning private investors utilizing StockVision AI 
                  to eliminate noise and forecast daily equity closing values with empirical clarity.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
                <Link 
                  to="/signup" 
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#d4ba8a] to-[#c1a36f] px-8 py-4 font-sans text-xs font-bold uppercase tracking-wider text-[#141d11] shadow-lg hover:brightness-105 active:scale-95 transition-all text-center"
                >
                  <span>Open Client Account</span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link 
                  to="/login" 
                  className="inline-flex items-center justify-center rounded-xl border border-[#d4ba8a]/40 bg-[#162214] px-6 py-4 font-sans text-xs font-bold uppercase tracking-wider text-[#f8f5ee] hover:bg-[#202e1b] transition-all text-center"
                >
                  <span>Access Dashboard</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#d4ba8a]/15 bg-[#0b1009] px-6 py-16 md:px-12 text-[#cbbaa0]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#d4ba8a]/10">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#24351f] border border-[#d4ba8a]/30 text-[#d4ba8a]">
                <TrendingUp className="size-4" />
              </div>
              <span className="font-serif text-lg font-bold text-[#f8f5ee]">
                StockVision<span className="text-[#d4ba8a]">.AI</span>
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-mono uppercase tracking-wider text-[#cbbaa0]/80">
              <Link to="/login" className="hover:text-[#f8f5ee] transition-colors">Terminal Login</Link>
              <Link to="/signup" className="hover:text-[#f8f5ee] transition-colors">Create Account</Link>
              <a href="#features" className="hover:text-[#f8f5ee] transition-colors">Methodology</a>
              <a href="http://127.0.0.1:8000/docs" target="_blank" rel="noreferrer" className="hover:text-[#f8f5ee] transition-colors">API Architecture</a>
            </div>
          </div>

          <div className="mt-8 space-y-4 text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#cbbaa0]/60">
              © 2026 StockVision AI Intelligence Systems. Built for PBL Quantitative Research.
            </p>
            <p className="text-[11px] leading-relaxed text-[#cbbaa0]/60 max-w-3xl mx-auto">
              Regulatory Disclosure: Machine learning projections are generated via historical market regression models 
              and technical feature extractors. These outputs represent algorithmic estimations for academic, research, 
              and educational evaluation, and should never be construed as personal financial or investment advisory.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
