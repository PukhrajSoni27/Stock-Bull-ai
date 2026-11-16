import {
  CartesianGrid,
  ComposedChart,
  Area,
  Line,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatInr, formatInrShort } from '../services/formatInr'

export default function PriceForecastChart({ chartSeries, asOf, sameDayOpen, predictedClose, dark }) {
  if (!chartSeries?.length) return null

  const axisStroke = '#3a5432'
  const gridStroke = '#1c2918'
  const tickFill = '#cbbaa0'
  const lineClose = '#81a876'
  const openDot = '#d4ba8a'
  const predDot = '#a7c59d'

  return (
    <div className="relative h-[400px] w-full min-w-0 font-mono">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartSeries} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5f8653" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#141f12" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#81a876" />
              <stop offset="70%" stopColor="#a7c59d" />
              <stop offset="100%" stopColor="#d4ba8a" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: tickFill, fontSize: 10, fontWeight: 500 }}
            tickLine={false}
            axisLine={{ stroke: '#2b3f26' }}
            interval="preserveStartEnd"
            minTickGap={60}
          />
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fill: tickFill, fontSize: 10, fontWeight: 500 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => formatInrShort(v)}
            width={72}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#121c10',
              border: '1px solid rgba(212, 186, 138, 0.3)',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '11px',
              boxShadow: '0 16px 32px rgba(8, 14, 7, 0.6)',
              fontFamily: 'JetBrains Mono, monospace',
            }}
            itemStyle={{ fontWeight: 600, color: '#f8f5ee' }}
            labelStyle={{ color: '#d4ba8a', marginBottom: '4px', fontWeight: 600 }}
            cursor={{ stroke: axisStroke, strokeWidth: 1.5, strokeDasharray: '4 4' }}
            formatter={(value) => [formatInr(value), 'Price']}
          />
          <Area
            type="monotone"
            dataKey="close"
            stroke="none"
            fillOpacity={1}
            fill="url(#colorClose)"
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke="url(#lineGradient)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, stroke: '#d4ba8a', strokeWidth: 2, fill: '#141f12' }}
          />
          <ReferenceDot
            x={asOf}
            y={sameDayOpen}
            r={6}
            fill={openDot}
            stroke="#141f12"
            strokeWidth={2}
            isFront
          />
          <ReferenceDot
            x={asOf}
            y={predictedClose}
            r={6}
            fill={predDot}
            stroke="#141f12"
            strokeWidth={2}
            isFront
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Legend Indicators */}
      <div className="mt-2 flex items-center justify-center gap-6 text-[10px] font-mono text-[#cbbaa0]">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#81a876]" />
          <span>Historical Trajectory</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#d4ba8a]" />
          <span>Open Valuation Dot</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#a7c59d]" />
          <span>XGBoost Projected Close</span>
        </div>
      </div>
    </div>
  )
}
