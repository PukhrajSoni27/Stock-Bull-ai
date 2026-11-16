import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, TrendingUp, Mail, Lock, LogIn, RefreshCw, ShieldCheck, KeyRound } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Login() {
  const { login, loginWithGoogle } = useAuth()
  const { push } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    const res = await login(email, password)
    setSubmitting(false)
    if (!res.ok) {
      push(res.error, 'error')
      return
    }
    push('Authentication successful. Welcome to your terminal.', 'success')
    navigate(from, { replace: true })
  }

  async function handleGoogleLogin() {
    setSubmitting(true)
    const res = await loginWithGoogle()
    setSubmitting(false)
    if (!res.ok) {
      push(res.error, 'error')
      return
    }
    push('Authenticated with Google credential.', 'success')
    navigate(from, { replace: true })
  }

  async function handleDemoLogin() {
    setSubmitting(true)
    const res = await login('demo.investor@stockbull.ai', 'demo1234')
    setSubmitting(false)
    if (!res.ok) {
      push(res.error, 'error')
      return
    }
    push('Authenticated as Demo Client.', 'success')
    navigate(from, { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-[#0d140b] text-[#f4efe6]">
      {/* Editorial Brand Showcase Left Panel */}
      <div className="relative hidden w-[45%] lg:flex flex-col justify-between overflow-hidden bg-[#121c10] p-14 border-r border-[#d4ba8a]/20">
        <div className="absolute inset-0 z-0 bg-subtle-grid opacity-60" />
        <div className="pointer-events-none absolute -left-20 -top-20 size-96 rounded-full bg-[#5f8653]/15 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 size-96 rounded-full bg-[#d4ba8a]/10 blur-[120px]" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="flex size-11 items-center justify-center rounded-xl bg-[#24351f] border border-[#d4ba8a]/40 text-[#d4ba8a] shadow-[0_4px_16px_rgba(20,30,18,0.5)]">
              <TrendingUp className="size-5" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#f8f5ee]">
                Stock Bull<span className="text-[#d4ba8a]">.ai</span>
              </span>
              <p className="font-mono text-[9px] uppercase tracking-widest text-[#cbbaa0]/80">
                Institutional Quant Workspace
              </p>
            </div>
          </Link>
          
          <div className="mt-28 max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4ba8a]/25 bg-[#1a2717] px-3.5 py-1 text-[11px] font-mono text-[#d4ba8a] mb-6">
              <ShieldCheck className="size-3.5 text-[#81a876]" />
              SECURE CLIENT GATEWAY
            </div>
            <h2 className="font-serif text-4xl font-bold leading-tight text-[#f8f5ee]">
              Empirical market foresight at your command.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[#cbbaa0]">
              Access machine-learning forecasts calibrated across historical market regimes, 
              institutional order-flow indicators, and real-time exchange feeds.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-[#d4ba8a]/15 pt-8 text-xs font-mono text-[#cbbaa0]/70">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#81a876]" />
            <span>256-BIT ENCRYPTED</span>
          </div>
          <span>TERMINAL V2.4</span>
        </div>
      </div>

      {/* Login Form Right Panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 relative">
        <div className="pointer-events-none absolute top-1/4 right-1/4 size-72 rounded-full bg-[#3a5432]/10 blur-[100px]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Card Container */}
          <div className="rounded-3xl border border-[#d4ba8a]/25 bg-[#141e12]/85 p-8 md:p-10 shadow-[0_20px_60px_rgba(8,13,7,0.6)] backdrop-blur-xl">
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#d4ba8a] uppercase tracking-wider mb-2">
                <KeyRound className="size-3.5 text-[#81a876]" />
                Identity Verification
              </div>
              <h1 className="font-serif text-3xl font-bold text-[#f8f5ee]">Welcome back</h1>
              <p className="mt-1.5 text-xs text-[#cbbaa0]">Enter credentials to access your trading intelligence suite.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={submitting}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#d4ba8a]/30 bg-[#1c2819] py-3.5 text-xs font-bold uppercase tracking-wider text-[#f8f5ee] transition-all hover:bg-[#253622] hover:border-[#d4ba8a]/60 active:scale-95 disabled:opacity-50 shadow-sm"
              >
                <span className="flex size-5 items-center justify-center rounded-full bg-[#f8f5ee] text-[#141d11] font-bold text-xs">
                  G
                </span>
                {submitting ? 'Authenticating...' : 'Sign in with Google'}
              </button>

              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#d4ba8a]/15" />
                </div>
                <div className="relative flex justify-center text-[10px] font-mono font-bold uppercase tracking-widest text-[#cbbaa0]/60">
                  <span className="bg-[#141e12] px-3">or continue with email</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#cbbaa0]">
                  Client Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#cbbaa0]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#d4ba8a]/25 bg-[#0e160c] py-3.5 pl-11 pr-4 text-xs font-medium text-[#f8f5ee] placeholder-[#cbbaa0]/40 outline-none transition-all focus:border-[#d4ba8a] focus:ring-2 focus:ring-[#d4ba8a]/20"
                    placeholder="investor@fund.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#cbbaa0]">
                  Password Key
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#cbbaa0]" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-[#d4ba8a]/25 bg-[#0e160c] py-3.5 pl-11 pr-4 text-xs font-medium text-[#f8f5ee] placeholder-[#cbbaa0]/40 outline-none transition-all focus:border-[#d4ba8a] focus:ring-2 focus:ring-[#d4ba8a]/20"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d4ba8a] via-[#e2cca6] to-[#c1a36f] py-4 text-xs font-bold uppercase tracking-wider text-[#141d11] shadow-[0_8px_24px_rgba(212,186,138,0.25)] transition-all hover:brightness-105 active:scale-95 disabled:opacity-50"
              >
                {submitting ? <RefreshCw className="size-4 animate-spin text-[#141d11]" /> : <LogIn className="size-4" />}
                {submitting ? 'Verifying Credentials...' : 'Authenticate & Enter Terminal'}
              </button>

              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#d4ba8a]/35 bg-[#172516] py-3 text-xs font-mono font-bold uppercase tracking-wider text-[#d4ba8a] hover:bg-[#20321e] hover:border-[#d4ba8a]/60 active:scale-95 disabled:opacity-50 transition-all"
              >
                <span>Instant Demo Client Access</span>
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#d4ba8a]/15 text-center">
              <p className="text-xs text-[#cbbaa0]">
                New client institution?{' '}
                <Link to="/signup" className="font-semibold text-[#d4ba8a] hover:text-[#f8f5ee] transition-colors underline decoration-[#d4ba8a]/40">
                  Request access
                </Link>
              </p>
            </div>
          </div>

          <Link to="/" className="mt-8 flex items-center justify-center gap-2 text-xs font-mono text-[#cbbaa0]/70 hover:text-[#f8f5ee] transition-colors">
            <ArrowLeft className="size-3.5" />
            <span>Return to Public Intelligence</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
