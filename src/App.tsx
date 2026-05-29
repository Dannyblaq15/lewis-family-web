import React, { useState } from 'react';
import { ScreenId } from './types';
import Header from './components/Header';
import HomeView from './components/HomeView';
import TreeView from './components/TreeView';
import CalendarView from './components/CalendarView';
import ProfilesView from './components/ProfilesView';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Screen orchestration state
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('HOME');
  
  // Custom transition animation settings ('push' | 'push_back' | 'slide_up')
  const [transitionStyle, setTransitionStyle] = useState<'push' | 'push_back' | 'slide_up' | 'none'>('push');

  // Shared application states for contextual highlighting between screens
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>('lewis-father');

  // Unified navigation orchestrator that respects requested motion paths
  const handleNavigate = (target: ScreenId, transition: 'push' | 'push_back' | 'slide_up') => {
    setTransitionStyle(transition);
    setCurrentScreen(target);
  };

  // Setting up the animation variants according to transition style selection
  const getVariants = () => {
    switch (transitionStyle) {
      case 'push':
        return {
          initial: { x: '100vw', opacity: 0, scale: 0.98 },
          animate: { x: 0, opacity: 1, scale: 1 },
          exit: { x: '-100vw', opacity: 0, scale: 0.98 }
        };
      case 'push_back':
        return {
          initial: { x: '-100vw', opacity: 0, scale: 0.98 },
          animate: { x: 0, opacity: 1, scale: 1 },
          exit: { x: '100vw', opacity: 0, scale: 0.98 }
        };
      case 'slide_up':
        return {
          initial: { y: '100vh', opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: '-100vh', opacity: 0 }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };

  // Render correct active screen view
  const renderScreen = () => {
    switch (currentScreen) {
      case 'HOME':
        return (
          <HomeView 
            onNavigate={handleNavigate} 
          />
        );
      case 'HOME_WITH_TREE':
        return (
          <TreeView 
            onNavigate={handleNavigate} 
            selectedMemberId={selectedMemberId}
          />
        );
      case 'CALENDAR':
        return (
          <CalendarView 
            onNavigate={handleNavigate} 
            setSelectedMemberId={setSelectedMemberId}
          />
        );
      case 'PROFILES':
        return (
          <ProfilesView 
            onNavigate={handleNavigate} 
            selectedMemberId={selectedMemberId}
            setSelectedMemberId={setSelectedMemberId}
          />
        );
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-stone-900 selection:bg-yellow-400 selection:text-black flex flex-col font-sans transition-colors duration-350">
      
      {/* Structural layout Header: contains absolute xpath trigger link structures */}
      <Header currentScreen={currentScreen} onNavigate={handleNavigate} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-[#12px] sm:px-4 py-6 md:py-12 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            variants={getVariants()}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', stiffness: 280, damping: 28, opacity: { duration: 0.18 } }}
            className="w-full h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Decorative scrap footer */}
      <footer className="border-t-3 border-black bg-[#faedd6] p-6 text-center text-xs font-mono font-medium text-stone-800 space-y-2 mt-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-stone-900 font-extrabold uppercase">© 2026 LEWIS ARCHIVE // LIVED FAMILY PROJECT</span>
          </div>
          
          <div className="text-[10px] text-stone-600">
            DIGITALLY COMPILED BY THE LEWIS FAMILY USING MODERN TS & SOLID LOGIC
          </div>
        </div>
      </footer>
    </div>
  );
}
