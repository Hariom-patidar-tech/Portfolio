import React from 'react';
import { motion } from 'framer-motion';

export default function SkillBar({ name, level, color = '#0F172A', icon: IconComponent }) {
  return (
    <div className="space-y-2 group">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          {IconComponent && <IconComponent className="w-4 h-4 transition-transform group-hover:scale-110" style={{ color }} />}
          <span className="font-bold text-slate-900 transition-colors">{name}</span>
        </div>
        <span className="font-mono text-xs text-slate-800 font-bold">
          {level}%
        </span>
      </div>

      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-[1px] border border-slate-200">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="h-full rounded-full relative bg-slate-900"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full animate-shimmer" />
        </motion.div>
      </div>
    </div>
  );
}
