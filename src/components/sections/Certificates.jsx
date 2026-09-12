import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Eye, X, CheckCircle, FileText } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { portfolioData } from '../../data/portfolioData';

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
      <SectionHeading
        badge="Verified Credentials"
        title="Professional AI Certificates"
        subtitle="Certifications in Machine Learning, Data Science, and Analytics from AWS, HP, Deloitte, Google, and LetsUpgrade."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {portfolioData.certificates.map((cert, idx) => {
          const isPdf = cert.pdf || cert.image?.endsWith('.pdf');
          return (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <GlassCard className="p-0 h-full flex flex-col justify-between overflow-hidden group">
                <div>
                  <div className="relative h-48 w-full overflow-hidden border-b border-slate-200 bg-slate-900/5 flex items-center justify-center">
                    {isPdf ? (
                      <iframe
                        src={`${cert.pdf || cert.image}#toolbar=0&navpanes=0&scrollbar=0`}
                        title={cert.title}
                        className="w-full h-full pointer-events-none object-cover scale-105"
                      />
                    ) : (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800';
                        }}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-mono shadow-md font-bold">
                        {cert.date}
                      </span>
                      <span className="p-1 rounded-full bg-emerald-600 text-white shadow-md">
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-600">
                      Issuer: <span className="text-slate-900 font-semibold">{cert.issuer}</span>
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 truncate">
                      ID: {cert.credentialId}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex-1 btn-antigravity-dark py-2.5 text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-white" />
                    <span className="text-white">Preview PDF</span>
                  </button>

                  <a
                    href={cert.pdf || cert.image}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-white/90 hover:bg-slate-900 text-slate-700 hover:text-white transition-all shadow-sm border border-slate-200"
                    title="Open PDF Document"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl glass-card rounded-2xl p-6 border border-slate-300 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-slate-900" />
                  <h3 className="font-display font-bold text-lg text-slate-900">
                    {selectedCert.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-xl overflow-hidden mb-4 border border-slate-200 bg-slate-100 flex items-center justify-center h-[65vh]">
                {selectedCert.pdf || selectedCert.image?.endsWith('.pdf') ? (
                  <iframe
                    src={selectedCert.pdf || selectedCert.image}
                    title={selectedCert.title}
                    className="w-full h-full rounded-lg border-0"
                  />
                ) : (
                  <img src={selectedCert.image} alt={selectedCert.title} className="w-full max-h-[60vh] object-contain rounded-lg shadow-sm" />
                )}
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-600">
                <span>Issued by {selectedCert.issuer} ({selectedCert.date})</span>
                <div className="flex items-center space-x-2">
                  <a
                    href={selectedCert.pdf || selectedCert.image}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-antigravity-dark px-4 py-2 text-white font-semibold flex items-center space-x-1.5 shadow-sm"
                  >
                    <span className="text-white">Open Official PDF</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
