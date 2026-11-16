export default function ChartPlaceholder() {
  const bars = [38, 62, 48, 78, 52, 88, 68, 82, 58, 92, 72, 86, 45, 90, 65, 84, 95]

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#d4ba8a]/20 bg-[#121c10] p-6 shadow-inner font-mono">
      <div className="pointer-events-none absolute -right-16 top-0 size-48 rounded-full bg-[#5f8653]/15 blur-3xl" />
      
      <div className="relative mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4ba8a]">
            Algorithmic Signal Dispersion
          </h3>
          <p className="mt-0.5 text-[10px] text-[#cbbaa0]">
            Continuous multi-factor volatility telemetry across 17 market regimes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#81a876] animate-pulse" />
          <span className="rounded-full border border-[#d4ba8a]/25 bg-[#1a2717] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#d4ba8a]">
            Synthesized Real-Time
          </span>
        </div>
      </div>

      <div className="relative flex h-48 items-end justify-between gap-1.5 pt-4">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-[#263721] via-[#5f8653] to-[#d4ba8a] opacity-85 transition-all duration-500 hover:opacity-100 hover:scale-y-105"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-[9px] text-[#cbbaa0]/70 pt-2 border-t border-[#d4ba8a]/10">
        <span>T-17 BARS</span>
        <span>SIGMA RANGE: [-1.8σ, +2.1σ]</span>
        <span>T-0 REGIME</span>
      </div>
    </div>
  )
}
