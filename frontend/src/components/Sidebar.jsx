import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { 
  TrendingUp, 
  LayoutDashboard, 
  Search, 
  History, 
  LogOut, 
  User,
  ChevronLeft,
  ChevronRight,
  Shield,
  Layers
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Sidebar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navItems = [
    { label: 'Executive Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Predictive Intelligence', path: '/predict', icon: Search },
    { label: 'Audit & History', path: '/history', icon: History },
  ]

  return (
    <motion.div
      animate={{ width: isCollapsed ? 84 : 290 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="relative z-30 flex h-screen flex-col border-r border-[#d4ba8a]/20 bg-[#10170e]/95 backdrop-blur-2xl text-[#f4efe6]"
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-12 z-50 flex size-7 items-center justify-center rounded-full border border-[#d4ba8a]/30 bg-[#1c2719] text-[#d4ba8a] shadow-lg hover:bg-[#253623] hover:text-[#f8f5ee] transition-all"
        title={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
      >
        {isCollapsed ? <ChevronRight className="size-3.5" /> : <ChevronLeft className="size-3.5" />}
      </button>

      {/* Brand Header */}
      <div className="flex h-20 items-center px-5 border-b border-[#d4ba8a]/15 bg-[#141e12]/60">
        <Link to="/" className="flex items-center gap-3.5 overflow-hidden group">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4a6c40] via-[#2c3f26] to-[#192516] border border-[#d4ba8a]/40 text-[#f8f5ee] shadow-[0_4px_16px_rgba(44,63,38,0.4)] transition-transform group-hover:scale-105">
            <TrendingUp className="size-5 text-[#d4ba8a]" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="flex flex-col min-w-0"
              >
                <span className="font-serif text-lg font-bold tracking-tight text-[#f8f5ee] leading-tight">
                  Stock Bull<span className="text-[#d4ba8a]">.ai</span>
                </span>
                <span className="font-mono text-[9px] tracking-widest text-[#cbbaa0]/80 uppercase">
                  Institutional Capital
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 p-3.5 pt-7">
        <div className="px-3 pb-2">
          {!isCollapsed && (
            <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#cbbaa0]/60">
              Terminal Suite
            </p>
          )}
        </div>
        {navItems.map((item) => {
          const active = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group relative flex items-center gap-3.5 rounded-xl px-3.5 py-3 transition-all ${
                active
                  ? 'bg-gradient-to-r from-[#2a3c25] to-[#1f2d1b] text-[#f8f5ee] border border-[#d4ba8a]/35 shadow-[0_4px_20px_rgba(20,30,18,0.6)]'
                  : 'text-[#cbbaa0] hover:bg-[#1a2617]/70 hover:text-[#f8f5ee] border border-transparent'
              }`}
            >
              <item.icon
                className={`size-5 shrink-0 transition-transform group-hover:scale-110 ${
                  active ? 'text-[#d4ba8a]' : 'text-[#a7c59d] group-hover:text-[#d4ba8a]'
                }`}
              />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    className="text-xs font-semibold tracking-wide truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {active && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#d4ba8a]"
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User & Security Footer */}
      <div className="space-y-3 border-t border-[#d4ba8a]/15 p-3.5 bg-[#141e12]/60">
        <div
          className={`flex items-center gap-3 rounded-xl border border-[#d4ba8a]/20 bg-[#1c2919]/60 p-3 ${
            isCollapsed ? 'justify-center p-2' : ''
          }`}
        >
          <div className="relative flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#2b3d26] border border-[#d4ba8a]/30 text-[#d4ba8a]">
            <User className="size-4" />
            <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-[#81a876] border-2 border-[#10170e]" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-[#f8f5ee]">
                {user?.name || 'Verified Trader'}
              </p>
              <p className="truncate font-mono text-[10px] text-[#cbbaa0]">
                {user?.email || 'Authenticated'}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#cbbaa0] hover:text-[#f87171] hover:bg-[#2b1b1b]/40 border border-transparent hover:border-[#f87171]/20 transition-all"
        >
          <LogOut className="size-4 shrink-0" />
          {!isCollapsed && <span>End Session</span>}
        </button>
      </div>
    </motion.div>
  )
}
