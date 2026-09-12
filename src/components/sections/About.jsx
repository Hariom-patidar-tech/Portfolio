import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { portfolioData } from '../../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
      <SectionHeading
        badge="About Me & Academic Background"
        title="Dedicated AI Developer Driven by Innovation"
        subtitle="Combining artificial intelligence fundamentals with practical web interface development."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Bio Card & Image */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-8">
            <div className="relative mb-6 rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
              <img
                src={portfolioData.personal.aboutImage}
                alt="Hariom Patidar Coding"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000';
                }}
                className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-mono text-white font-bold px-3.5 py-1.5 rounded-full bg-slate-900 shadow-md">
                  {portfolioData.personal.location}
                </span>
              </div>
            </div>

            <h3 className="font-display text-2xl font-bold text-slate-900 mb-4">
              Hello, I'm <span className="text-slate-900">{portfolioData.personal.name}</span>
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
              {portfolioData.personal.bio}
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-200 text-xs font-mono text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-500">Degree:</span>
                <span className="text-slate-900 font-bold">{portfolioData.personal.degree}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">CGPA:</span>
                <span className="text-slate-900 font-bold">{portfolioData.personal.cgpa}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">College:</span>
                <span className="text-slate-900 font-semibold">{portfolioData.personal.collegeName}</span>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="#contact"
                className="w-full btn-antigravity-dark py-3.5 flex items-center justify-center space-x-2 text-xs font-mono"
              >
                <span className="text-white font-semibold">Connect With Hariom</span>
              </a>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Academic Timeline */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center space-x-3 mb-6">
            <GraduationCap className="w-6 h-6 text-slate-900" />
            <h3 className="font-display text-2xl font-bold text-slate-900">Academic Journey</h3>
          </div>

          <div className="relative border-l-2 border-slate-300 ml-4 space-y-8 pl-6 sm:pl-8">
            {portfolioData.education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="relative group"
              >
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-slate-900 border-2 border-white transition-colors shadow-md" />

                <GlassCard className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="font-display font-bold text-lg text-slate-900 group-hover:text-slate-700 transition-colors">
                      {edu.degree}
                    </h4>
                    <span className="px-3.5 py-1 rounded-full bg-slate-900 text-white text-xs font-mono font-bold shadow-sm">
                      CGPA: {edu.cgpa}
                    </span>
                  </div>

                  <p className="text-slate-600 text-sm font-semibold mb-1">
                    {edu.institution} • <span className="text-slate-500">{edu.university}</span>
                  </p>

                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 mb-4">
                    <Calendar className="w-3.5 h-3.5 text-slate-700" />
                    <span>{edu.period}</span>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-200">
                    {edu.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start space-x-2 text-xs text-slate-700 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
