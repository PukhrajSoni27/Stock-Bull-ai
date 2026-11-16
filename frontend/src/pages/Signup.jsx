import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, Mail, Lock, User, UserPlus, RefreshCw, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Signup() {
  const { signup, loginWithGoogle } = useAuth()
  const { push } = useToast()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (password.length < 6) {
      push('Security policy requires at least 6 characters.', 'error')
      return
    }
    setSubmitting(true)
    const res = await signup(name, email, password)
    setSubmitting(false)
    if (!res.ok) {
      push(res.error, 'error')
      return
    }
    push('Client account initialized. Terminal access granted.', 'success')
    navigate('/dashboard', { replace: true })
  }

  async function handleGoogleSignup() {
    setSubmitting(true)
    const res = await loginWithGoogle()
    setSubmitting(false)
    if (!res.ok) {
      push(res.error, 'error')
      return
    }
    push('Authenticated with Google credential.', 'success')
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-[#0d140b] text-[#f4efe6]">
      {/* Brand Showcase Left Panel */}
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
                StockVision<span className="text-[#d4ba8a]">.AI</span>
              </span>
              <p className="font-mono text-[9px] uppercase tracking-widest text-[#cbbaa0]/80">
                Institutional Quant Workspace
              </p>
            </div>
          </Link>
          
          <div className="mt-24 max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4ba8a]/25 bg-[#1a2717] px-3.5 py-1 text-[11px] font-mono text-[#d4ba8a] mb-6">
              <ShieldCheck className="size-3.5 text-[#81a876]" />
              INSTITUTIONAL ENROLLMENT
            </div>
            <h2 className="font-serif text-4xl font-bold leading-tight text-[#f8f5ee]">
              Equip your capital with empirical conviction.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[#cbbaa0]">
              Establish an institutional workspace. All prediction audit trails, holdout confidence scores, 
              and multi-currency simulations are securely managed for your profile.
            </p>

            <div className="mt-8 space-y-3 font-mono text-xs text-[#cbbaa0]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-[#81a876]" />
                <span>Deterministic XGBoost closing models</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-[#81a876]" />
                <span>NSE / BSE Indian equities in native INR</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-[#81a876]" />
                <span>Historical audit logging & CSV exports</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-[#d4ba8a]/15 pt-8 text-xs font-mono text-[#cbbaa0]/70">
          <span>PBL RESEARCH PLATFORM</span>
          <span>EST. 2026</span>
        </div>
      </div>

      {/* Signup Form Right Panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 relative">
        <div className="pointer-events-none absolute bottom-1/4 left-1/4 size-72 rounded-full bg-[#5f8653]/10 blur-[100px]" />
        
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
                <UserPlus className="size-3.5 text-[#81a876]" />
                Client Registration
              </div>
              <h1 className="font-serif text-3xl font-bold text-[#f8f5ee]">Create Account</h1>
              <p className="mt-1.5 text-xs text-[#cbbaa0]">Initialize your StockVision AI terminal credentials.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={submitting}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#d4ba8a]/30 bg-[#1c2819] py-3 text-xs font-bold uppercase tracking-wider text-[#f8f5ee] transition-all hover:bg-[#253622] hover:border-[#d4ba8a]/60 active:scale-95 disabled:opacity-50 shadow-sm"
              >
                <span className="flex size-5 items-center justify-center rounded-full bg-[#f8f5ee] text-[#141d11] font-bold text-xs">
                  G
                </span>
                {submitting ? 'Connecting...' : 'Continue with Google'}
              </button>

              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#d4ba8a]/15" />
                </div>
                <div className="relative flex justify-center text-[10px] font-mono font-bold uppercase tracking-widest text-[#cbbaa0]/60">
                  <span className="bg-[#141e12] px-3">or create with email</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#cbbaa0]">
                  Full Name / Entity
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#cbbaa0]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-[#d4ba8a]/25 bg-[#0e160c] py-3 pl-11 pr-4 text-xs font-medium text-[#f8f5ee] placeholder-[#cbbaa0]/40 outline-none transition-all focus:border-[#d4ba8a] focus:ring-2 focus:ring-[#d4ba8a]/20"
                    placeholder="e.g. Warren Hastings"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#cbbaa0]">
                  Official Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#cbbaa0]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#d4ba8a]/25 bg-[#0e160c] py-3 pl-11 pr-4 text-xs font-medium text-[#f8f5ee] placeholder-[#cbbaa0]/40 outline-none transition-all focus:border-[#d4ba8a] focus:ring-2 focus:ring-[#d4ba8a]/20"
                    placeholder="analyst@fund.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#cbbaa0]">
                  Security Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#cbbaa0]" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-[#d4ba8a]/25 bg-[#0e160c] py-3 pl-11 pr-4 text-xs font-medium text-[#f8f5ee] placeholder-[#cbbaa0]/40 outline-none transition-all focus:border-[#d4ba8a] focus:ring-2 focus:ring-[#d4ba8a]/20"
                    placeholder="Minimum 6 characters"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d4ba8a] via-[#e2cca6] to-[#c1a36f] py-3.5 text-xs font-bold uppercase tracking-wider text-[#141d11] shadow-[0_8px_24px_rgba(212,186,138,0.25)] transition-all hover:brightness-105 active:scale-95 disabled:opacity-50 mt-2"
              >
                {submitting ? <RefreshCw className="size-4 animate-spin text-[#141d11]" /> : <UserPlus className="size-4" />}
                {submitting ? 'Creating Profile...' : 'Complete Registration'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#d4ba8a]/15 text-center">
              <p className="text-xs text-[#cbbaa0]">
                Already have credentials?{' '}
                <Link to="/login" className="font-semibold text-[#d4ba8a] hover:text-[#f8f5ee] transition-colors underline decoration-[#d4ba8a]/40">
                  Client sign in
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
