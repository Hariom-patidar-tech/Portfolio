import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, Eye, ExternalLink, CheckCircle2, Award, BookOpen, Briefcase } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { portfolioData } from '../../data/portfolioData';

export default function ResumeSection() {
  return (
    <section id="resume" className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
      <SectionHeading
        badge="Curriculum Vitae"
        title="Official Resume & Profile Summary"
        subtitle="Preview or download my complete technical CV detailing Machine Learning models, Python development, and AI projects."
      />

      <div className="max-w-5xl mx-auto space-y-6">
        <GlassCard className="p-6 sm:p-8 relative overflow-hidden border-slate-200 shadow-md">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <h3 className="font-display font-extrabold text-2xl text-slate-900">
                {portfolioData.personal.name}
              </h3>
              <p className="text-slate-700 font-mono text-xs mt-1 font-bold">
                {portfolioData.personal.title} • {portfolioData.personal.location}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-antigravity-light px-4 py-2.5 text-slate-900 text-xs font-mono font-semibold shadow-sm flex items-center space-x-2 border border-slate-200 hover:bg-slate-100 transition-all"
              >
                <Eye className="w-4 h-4 text-slate-800" />
                <span>View Fullscreen</span>
              </a>

              <a
                href={portfolioData.personal.resumeUrl}
                download="Hariom_Patidar_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-antigravity-dark px-5 py-2.5 text-white text-xs font-mono font-semibold shadow-md flex items-center space-x-2"
              >
                <FileDown className="w-4 h-4 text-white" />
                <span className="text-white">Download PDF</span>
              </a>
            </div>
          </div>

          {/* Embedded Interactive Resume PDF Viewer */}
          <div className="my-6 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-[620px] shadow-inner">
            <iframe
              src={`${portfolioData.personal.resumeUrl}#toolbar=1`}
              title="Hariom Patidar Resume Preview"
              className="w-full h-full border-0"
            />
          </div>

          <div className="py-6 space-y-6 text-xs text-slate-700 font-sans">
            
            <div>
              <h4 className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center space-x-2">
                <BookOpen className="w-3.5 h-3.5 text-slate-900" />
                <span>Education</span>
              </h4>
              <p className="text-slate-900 font-semibold">{portfolioData.personal.degree}</p>
              <p className="text-slate-600">{portfolioData.personal.collegeName} ({portfolioData.personal.university}) | CGPA: {portfolioData.personal.cgpa}</p>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center space-x-2">
                <Briefcase className="w-3.5 h-3.5 text-slate-900" />
                <span>Key Technical Competencies</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'OpenCV', 'Natural Language Processing', 'HTML5', 'CSS3', 'JavaScript (ES6+)'].map((sk) => (
                  <span key={sk} className="px-3 py-1 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold shadow-sm">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center space-x-2">
                <Award className="w-3.5 h-3.5 text-slate-900" />
                <span>Selected Honors & Highlights</span>
              </h4>
              <ul className="space-y-1.5 text-slate-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>TensorFlow Developer Specialization Certified by DeepLearning.AI</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Stanford Online Machine Learning Certified</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Developer of computer vision object detection tools and NLP projects</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Last Updated: September 2026</span>
            <span>Verified Profile #AR-AI-99318</span>
          </div>

        </GlassCard>
      </div>
    </section>
  );
}
