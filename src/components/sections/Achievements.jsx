import React, { useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Flame, Trophy, Code2, FolderGit2, Award, GitCommit } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import AnimatedCounter from '../ui/AnimatedCounter';
import { portfolioData } from '../../data/portfolioData';

const achievementIcons = [
  Code2, FolderGit2, Award, Trophy, Flame, GitCommit
];

export default function Achievements() {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      // Trigger subtle confetti burst
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#7C3AED', '#06B6D4', '#F472B6']
      });
    }
  }, [isInView]);

  return (
    <section ref={containerRef} id="achievements" className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge="Metrics & Milestones"
        title="Quantifiable Impact & Accomplishments"
        subtitle="Empirical proof of problem-solving dedication, active coding streaks, and project delivery."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.achievements.map((item, idx) => {
          const IconComp = achievementIcons[idx % achievementIcons.length];
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <GlassCard className="p-8 h-full flex flex-col justify-between group border-purple-500/20 hover:border-purple-500/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-purple-600/10 text-purple-400 border border-purple-500/30 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6 text-cyan-300" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                    Verified
                  </span>
                </div>

                <div>
                  <div className="mb-2">
                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-1">
                    {item.label}
                  </h3>

                  <p className="text-zinc-400 text-xs font-sans">
                    {item.description}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
