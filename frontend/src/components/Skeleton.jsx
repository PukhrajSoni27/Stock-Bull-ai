import { motion } from 'framer-motion'

export default function Skeleton({ className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 0.8 }}
      transition={{ duration: 0.9, repeat: Infinity, repeatType: 'reverse' }}
      className={`rounded-xl border border-[#d4ba8a]/15 bg-[#172415] ${className}`}
    />
  )
}
