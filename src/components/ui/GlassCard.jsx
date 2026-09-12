import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hoverGlow = 'primary' }) {
  const glowClasses = {
    primary: 'hover:border-indigo-400 hover:shadow-[0_15px_40px_-10px_rgba(99,102,241,0.15)]',
    cyan: 'hover:border-sky-400 hover:shadow-[0_15px_40px_-10px_rgba(2,132,199,0.15)]',
    pink: 'hover:border-rose-400 hover:shadow-[0_15px_40px_-10px_rgba(225,29,72,0.15)]',
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      className={`glass-card rounded-2xl p-6 border border-slate-200/90 bg-white/85 backdrop-blur-xl relative overflow-hidden transition-all duration-300 ${glowClasses[hoverGlow] || ''} ${className}`}
    >
      {/* Corner Ambient Light Accent */}
      <div className="absolute -top-14 -right-14 w-36 h-36 bg-gradient-to-br from-indigo-100/50 to-transparent rounded-full blur-2xl pointer-events-none" />
      {children}
    </motion.div>
  );
}
