import React from 'react';
import { ScreenId } from '../types';
import { Sparkles, Calendar, Users, FolderArchive, HelpCircle, GitPullRequest } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId, transition: 'push' | 'push_back' | 'slide_up') => void;
}  

export default function Header({ currentScreen, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#faedd6]/95 backdrop-blur-md border-b-3 border-black p-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand Logo with retro dot-matrix styling */}
        <div 
          onClick={() => onNavigate('HOME', 'push_back')}
          className="flex items-center gap-3 cursor-pointer group active:scale-95 transition-transform"
        >
          <div 
            id="brand-logo"
            className="font-black text-2xl tracking-tighter text-black uppercase select-none flex items-center gap-2"
          >
            <div className="bg-[#1c1917] text-[#faedd6] px-2.5 py-1 text-sm font-mono brutal-shadow-sm rounded-xs rotate-[-2deg] group-hover:rotate-[3deg] transition-transform">
              LEWIS
            </div>
            {/* The absolute critical xpath anchor: //div[contains(text(), 'HOME')] */}
            <div className="font-serif tracking-tight text-xl font-bold border-b-2 border-dashed border-[#d95d39] pb-0.5">
              HOME
            </div>
          </div>
        </div>



        {/* Nav Tabs */}
        <nav className="flex items-center flex-wrap justify-center gap-1.5 sm:gap-2.5">
          <button
            onClick={() => onNavigate('HOME_WITH_TREE', currentScreen === 'HOME' ? 'push' : 'push_back')}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 border-2 border-black font-mono text-[11px] sm:text-xs font-bold leading-none select-none transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none bg-[#ffd8be] text-black hover:bg-[#fff7ed] ${
              currentScreen === 'HOME_WITH_TREE'
                ? 'translate-x-[2px] translate-y-[2px] shadow-none bg-[#ffbe9d]'
                : 'brutal-shadow-sm'
            }`}
          >
            <a href="#tree" onClick={(e) => { e.preventDefault(); }} className="flex items-center gap-1.5">
              <GitPullRequest size={13} className="stroke-[2.5]" />
              TREE
            </a>
          </button>

          <button
            onClick={() => onNavigate('CALENDAR', 'push')}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 border-2 border-black font-mono text-[11px] sm:text-xs font-bold leading-none select-none transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none bg-[#ffd6db] text-black hover:bg-[#ffebee] ${
              currentScreen === 'CALENDAR'
                ? 'translate-x-[2px] translate-y-[2px] shadow-none bg-[#ffa6b2]'
                : 'brutal-shadow-sm'
            }`}
          >
            <a href="#timeline" onClick={(e) => { e.preventDefault(); }} className="flex items-center gap-1.5">
              <Calendar size={13} className="stroke-[2.5]" />
              TIMELINE
            </a>
          </button>

          <button
            onClick={() => onNavigate('PROFILES', 'push')}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 border-2 border-black font-mono text-[11px] sm:text-xs font-bold leading-none select-none transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none bg-[#cfe9d4] text-black hover:bg-[#ebf6ec] ${
              currentScreen === 'PROFILES'
                ? 'translate-x-[2px] translate-y-[2px] shadow-none bg-[#abcda4]'
                : 'brutal-shadow-sm'
            }`}
          >
            <a href="#profiles" onClick={(e) => { e.preventDefault(); }} className="flex items-center gap-1.5">
              <Users size={13} className="stroke-[2.5]" />
              PROFILES
            </a>
          </button>
        </nav>
      </div>
      
      {/* Visual warm gradient tape accent at the bottom of header */}
      <div className="h-1 bg-gradient-to-r from-[#e76f51] via-[#f4a261] to-[#e9c46a] mt-2"></div>
    </header>
  );
}
