import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { History as HistoryIcon, Download, Trash2, ExternalLink, ShieldCheck, FileSpreadsheet } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { formatStoredField } from '../services/formatInr'
import { deletePrediction, subscribePredictions } from '../services/predictions'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 }
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

export default function History() {
  const { user } = useAuth()
  const [rows, setRows] = useState([])

  useEffect(() => {
    if (!user?.uid) return undefined
    return subscribePredictions(user.uid, setRows, () => setRows([]))
  }, [user?.uid])

  const handleDelete = async (id) => {
    if (!user?.uid) return
    if (!window.confirm('Confirm deletion of this audited forecast entry?')) return
    try {
      await deletePrediction(user.uid, id)
    } catch (error) {
      console.error('Failed to delete prediction:', error)
      alert('Failed to delete record. Please retry.')
    }
  }

  const handleExport = () => {
    const csv = [
      ['Timestamp', 'Symbol', 'Open Price', 'Predicted Close', 'Confidence', 'Trend'],
      ...rows.map(r => [
        new Date(r.timestamp).toLocaleString(),
        r.symbol,
        formatStoredField(r, 'open'),
        formatStoredField(r, 'prediction'),
        `${(Number(r.confidence) * 100).toFixed(1)}%`,
        r.prediction > r.open ? 'Bullish' : 'Bearish'
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `stockvision-institutional-audit-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#d4ba8a]/15 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#d4ba8a] mb-1">
            <span className="size-1.5 rounded-full bg-[#81a876]" />
            IMMUTABLE AUDIT LOG
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#f8f5ee]">
            Quantitative Execution Ledger
          </h1>
          <p className="mt-1 text-xs text-[#cbbaa0]">
            Comprehensive verified archive of all XGBoost forecasts generated under your client session.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            disabled={rows.length === 0}
            className="flex items-center gap-2 rounded-xl border border-[#d4ba8a]/35 bg-[#172415] px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#d4ba8a] hover:bg-[#20311c] hover:border-[#d4ba8a]/60 transition-all disabled:opacity-40"
          >
            <Download className="size-3.5" />
            <span>Export Audit CSV</span>
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <motion.div
        variants={item}
        className="overflow-hidden rounded-2xl border border-[#d4ba8a]/25 bg-[#141f12]/90 shadow-[0_12px_36px_rgba(8,14,7,0.4)] backdrop-blur-md"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#d4ba8a]/20 bg-[#172415]/90 text-[10px] uppercase tracking-wider text-[#cbbaa0]">
                <th className="px-6 py-4">Timestamp (IST)</th>
                <th className="px-6 py-4">Security</th>
                <th className="px-6 py-4">Open Valuation</th>
                <th className="px-6 py-4">Projected Close</th>
                <th className="px-6 py-4">Holdout Confidence</th>
                <th className="px-6 py-4">Alpha Regime</th>
                <th className="px-6 py-4 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d4ba8a]/10">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center">
                      <div className="mb-4 rounded-2xl bg-[#1b2b18] border border-[#d4ba8a]/20 p-5 shadow-inner">
                        <HistoryIcon className="size-8 text-[#cbbaa0]" />
                      </div>
                      <p className="font-serif text-lg font-bold text-[#f8f5ee]">No Ledger Entries Recorded</p>
                      <p className="mt-1 text-xs text-[#cbbaa0] max-w-xs font-sans">
                        Any forecasts generated in the prediction terminal will automatically be archived here.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <motion.tr
                    key={r.id}
                    variants={item}
                    className="group transition-colors hover:bg-[#1c2c19]/70"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-[#cbbaa0]">
                      {formatDate(r.timestamp)}
                    </td>
                    <td className="px-6 py-4 font-bold text-[#f8f5ee] flex items-center gap-2">
                      <span className="size-2 rounded-full bg-[#81a876]" />
                      <span className="text-sm">{r.symbol}</span>
                    </td>
                    <td className="px-6 py-4 tabular-nums text-[#cbbaa0]">
                      {formatStoredField(r, 'open')}
                    </td>
                    <td className="px-6 py-4 font-bold tabular-nums text-[#d4ba8a] text-sm">
                      {formatStoredField(r, 'prediction')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#24351f]">
                          <div
                            className="h-full bg-gradient-to-r from-[#5f8653] to-[#d4ba8a]"
                            style={{ width: `${Number(r.confidence) * 100}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-[#f8f5ee]">
                          {(Number(r.confidence) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${r.prediction > r.open
                        ? 'border-[#81a876]/40 bg-[#81a876]/10 text-[#81a876]'
                        : 'border-[#f87171]/40 bg-[#f87171]/10 text-[#f87171]'
                        }`}>
                        {r.prediction > r.open ? '▲ Bullish Bias' : '▼ Bearish Bias'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 rounded-lg text-[#cbbaa0] hover:text-[#d4ba8a] hover:bg-[#24351f] transition-all"
                          title="Audit on Yahoo Finance"
                          onClick={() => window.open(`https://finance.yahoo.com/quote/${r.symbol}`, '_blank')}
                        >
                          <ExternalLink className="size-3.5" />
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-[#cbbaa0] hover:text-[#f87171] hover:bg-[#381c1c]/40 transition-all"
                          title="Purge record"
                          onClick={() => handleDelete(r.id)}
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
