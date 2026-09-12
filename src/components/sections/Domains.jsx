import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Layout, Server, Code2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { portfolioData } from '../../data/portfolioData';

const domainIcons = {
  Brain, Layout, Server, Code2
};

export default function Domains() {
  return (
    <section id="domains" className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
      <SectionHeading
        badge="Core Expertise"
        title="Specialized Engineering Domains"
        subtitle="Focused capabilities in Artificial Intelligence, Frontend Web Interfaces, and Python Backend Services."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {portfolioData.domains.map((domain, idx) => {
          const IconComp = domainIcons[domain.icon] || Code2;
          return (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <GlassCard className="p-7 h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3.5 rounded-2xl bg-slate-900 text-white shadow-md group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider font-bold">
                      Domain #0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                    {domain.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed mb-6 font-sans">
                    {domain.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex flex-wrap gap-1.5">
                    {domain.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full bg-slate-900 text-white text-[10px] font-mono font-semibold shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
