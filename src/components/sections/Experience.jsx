import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { portfolioData } from '../../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
      <SectionHeading
        badge="Experience & Contributions"
        title="AI Engineering Experience"
        subtitle="Practical internship roles and open source machine learning contributions."
      />

      <div className="relative border-l-2 border-slate-300 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
        {portfolioData.experience.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="relative group"
          >
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center transition-colors shadow-md">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            </div>

            <GlassCard className="p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center space-x-3">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-slate-700 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="px-3.5 py-1 rounded-full bg-slate-900 text-white text-xs font-mono font-bold shadow-sm">
                    {exp.type}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono text-slate-700 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-slate-900" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs font-mono text-slate-600 mb-4">
                <span className="font-bold text-slate-800">{exp.company}</span>
                <span>•</span>
                <span className="flex items-center space-x-1 text-slate-500">
                  <MapPin className="w-3 h-3 text-slate-900" />
                  <span>{exp.location}</span>
                </span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
                {exp.description}
              </p>

              <div className="space-y-2 pt-4 border-t border-slate-200">
                {exp.achievements.map((ach, aIdx) => (
                  <div key={aIdx} className="flex items-start space-x-2.5 text-xs text-slate-700 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
