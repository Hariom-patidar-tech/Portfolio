import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Layout, Brain, Wrench } from 'lucide-react';
import {
  FaPython, FaJava, FaReact, FaHtml5, FaNodeJs, FaGitAlt, FaDocker, FaLinux, FaAws, FaDatabase, FaRobot
} from 'react-icons/fa';
import {
  SiCplusplus, SiTypescript, SiTailwindcss, SiFramer, SiThreedotjs, SiFastapi, SiGraphql, SiRedis,
  SiMongodb, SiPostgresql, SiMysql, SiPytorch, SiTensorflow, SiOpencv, SiPostman
} from 'react-icons/si';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import SkillBar from '../ui/SkillBar';
import { portfolioData } from '../../data/portfolioData';

const iconMap = {
  FaPython, FaJava, SiCpp: SiCplusplus, SiTypescript, FaDatabase, FaReact, SiTailwindcss, SiFramer, FaHtml5,
  SiThreedotjs, FaNodeJs, SiFastapi, SiGraphql, SiRedis, SiMongodb, SiPostgresql, SiMysql,
  SiPyTorch: SiPytorch, SiTensorflow, SiOpencv, FaRobot, FaGitAlt, FaDocker, FaLinux, FaAws, SiPostman
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...portfolioData.skills.map((s) => s.category)];

  const categoryIcons = {
    All: Sparkles,
    'AI & Machine Learning': Brain,
    'Web Development': Layout,
    'Tools & Environment': Wrench
  };

  const filteredSkillGroup = portfolioData.skills
    .map((group) => {
      if (activeCategory !== 'All' && group.category !== activeCategory) {
        return null;
      }

      return {
        category: group.category,
        items: group.items,
      };
    })
    .filter(Boolean);

  return (
    <section id="skills" className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
      <SectionHeading
        badge="Technical Arsenal"
        title="Skills & Technical Proficiency"
        subtitle="Artificial Intelligence, Machine Learning in Python paired with clean web development in HTML, CSS, and JavaScript."
      />

      <div className="flex justify-center mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const CatIcon = categoryIcons[cat] || Sparkles;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center space-x-2 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white/80 text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <CatIcon className="w-3.5 h-3.5" />
                <span className={isActive ? 'text-white' : 'text-slate-800'}>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSkillGroup.map((group, gIdx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: gIdx * 0.1 }}
          >
            <GlassCard className="p-6 h-full">
              <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-slate-200">
                <div className="p-2 rounded-xl bg-slate-900 text-white">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  {group.category}
                </h3>
              </div>

              <div className="space-y-5">
                {group.items.map((skill) => {
                  const IconComp = iconMap[skill.icon] || Code2;
                  return (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={skill.color}
                      icon={IconComp}
                    />
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
