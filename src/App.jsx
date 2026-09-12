import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/common/CustomCursor';
import BackgroundAurora from './components/common/BackgroundAurora';
import PageLoader from './components/common/PageLoader';
import ScrollProgress from './components/common/ScrollProgress';
import CommandPalette from './components/common/CommandPalette';
import Navbar from './components/layout/Navbar';
import GlassDock from './components/layout/GlassDock';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import { useCommandPalette } from './hooks/useCommandPalette';

export default function App() {
  const { isOpen, setIsOpen, toggle } = useCommandPalette();

  return (
    <Router>
      <div className="relative min-h-screen bg-transparent text-slate-900 selection:bg-slate-900 selection:text-white font-sans antialiased overflow-x-hidden">
        
        {/* Special UX Components */}
        <PageLoader />
        <CustomCursor />
        <ScrollProgress />
        <BackgroundAurora />

        {/* Global Navbars & Command Overlay */}
        <Navbar onOpenCommand={() => setIsOpen(true)} />
        <GlassDock onOpenCommand={() => setIsOpen(true)} />
        <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
