import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { portfolioData } from '../../data/portfolioData';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = portfolioData.testimonials;

  function nextTestimonial() {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }

  function prevTestimonial() {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }

  return (
    <section id="testimonials" className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
      <SectionHeading
        badge="Endorsements"
        title="What Mentors & Researchers Say"
        subtitle="Feedback from AI lab leads and research mentors."
      />

      <div className="max-w-4xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard className="p-8 sm:p-12 relative">
              <Quote className="w-12 h-12 text-slate-200 absolute top-6 right-6" />

              <div className="flex items-center space-x-1 text-amber-500 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>

              <p className="text-slate-800 text-base sm:text-xl font-sans leading-relaxed italic mb-8">
                "{testimonials[currentIndex].content}"
              </p>

              <div className="flex items-center space-x-4 pt-6 border-t border-slate-200">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-300 shadow-sm"
                />
                <div>
                  <h4 className="font-display font-bold text-base text-slate-900">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-xs font-mono text-slate-600 font-semibold">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentIndex === i ? 'w-8 bg-slate-900' : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={prevTestimonial}
              className="p-2.5 rounded-xl bg-white/90 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2.5 rounded-xl bg-white/90 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
