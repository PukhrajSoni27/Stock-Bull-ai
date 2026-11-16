export default function Spinner({ className = '' }) {
  return (
    <span
      className={`inline-block size-8 animate-spin rounded-full border-2 border-[#d4ba8a]/20 border-t-[#d4ba8a] ${className}`}
      role="status"
      aria-label="Loading"
    />
  )
}
