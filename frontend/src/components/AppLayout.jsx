import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { ShieldCheck, Sparkles } from 'lucide-react'

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#0d140b] text-[#f4efe6] selection:bg-[#5f8653]/30 selection:text-[#f8f5ee]">
      <Sidebar />
      <div className="relative flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top subtle luxury ticker bar */}
        <header className="h-14 border-b border-[#d4ba8a]/15 bg-[#131b10]/80 backdrop-blur-md px-6 md:px-10 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#1e2a1a] border border-[#d4ba8a]/20">
              <span className="size-2 rounded-full bg-[#81a876] animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider text-[#d4ba8a] uppercase font-semibold">
                MODEL: XGBOOST REGIME V2.4
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#cbbaa0]/80 font-mono">
              <span>EXCHANGES: NSE · BSE · NYSE · NASDAQ</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-[#a7c59d]">
              <ShieldCheck className="size-3.5 text-[#d4ba8a]" />
              <span className="font-mono text-[11px] text-[#d4ba8a]">ENCRYPTED WORKSPACE</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="relative flex-1 overflow-y-auto p-6 md:p-10 bg-radial-luxury">
          {/* Subtle Guilloche / Grid pattern */}
          <div className="pointer-events-none absolute inset-0 bg-subtle-grid opacity-60" />
          
          {/* Ambient Lighting Orbs */}
          <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-[#5f8653]/15 blur-[120px]" />
          <div className="pointer-events-none absolute top-1/2 -right-32 size-[500px] rounded-full bg-[#d4ba8a]/8 blur-[160px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 size-96 rounded-full bg-[#3a5432]/20 blur-[130px]" />

          <div className="relative z-10 mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
