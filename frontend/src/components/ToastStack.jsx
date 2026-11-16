import { useToast } from '../context/ToastContext'

const styles = {
  info: 'border border-[#d4ba8a]/30 bg-[#162214] text-[#f8f5ee] shadow-[0_10px_25px_rgba(8,14,7,0.7)]',
  success: 'border border-[#81a876]/40 bg-[#1b2b18] text-[#f8f5ee] shadow-[0_10px_25px_rgba(30,48,26,0.7)]',
  error: 'border border-[#f87171]/40 bg-[#291717] text-[#fca5a5] shadow-[0_10px_25px_rgba(40,15,15,0.7)]',
}

export default function ToastStack() {
  const { toasts } = useToast()
  if (!toasts.length) return null

  return (
    <div
      className="pointer-events-none fixed bottom-6 right-6 z-[100] flex max-w-sm flex-col gap-2 font-mono"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto rounded-xl px-4 py-3 text-xs font-medium shadow-xl backdrop-blur-md transition-all duration-300 ${styles[t.variant] || styles.info}`}
        >
          <div className="flex items-center gap-2">
            <span className={`size-1.5 rounded-full ${t.variant === 'error' ? 'bg-[#f87171]' : 'bg-[#d4ba8a]'}`} />
            <span>{t.message}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
