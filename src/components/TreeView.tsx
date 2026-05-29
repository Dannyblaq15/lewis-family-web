import React, { useState } from 'react';
import { ScreenId, FamilyMember } from '../types';
import { FAMILY_MEMBERS } from '../data';
import { GitCommit, Sparkle, ArrowLeft, ArrowRight, Heart, Star, BookOpen, Quote, Sparkles } from 'lucide-react';

interface TreeViewProps {
  onNavigate: (screen: ScreenId, transition: 'push' | 'push_back' | 'slide_up') => void;
  selectedMemberId?: string | null;
}

export default function TreeView({ onNavigate, selectedMemberId }: TreeViewProps) {
  // Local state to track which ancestor is active/highlighted in our visual tree
  const [activeMemberId, setActiveMemberId] = useState<string>(selectedMemberId || FAMILY_MEMBERS[0]?.id || 'lewis-father');

  const activeMember = FAMILY_MEMBERS.find(m => m.id === activeMemberId) || FAMILY_MEMBERS[0];

  return (
    <div className="space-y-10">
      {/* Mini Breadcrumb back bar */}
      <div className="flex items-center justify-between border-b border-stone-300 pb-3">
        <div className="flex items-center gap-2">
          {/* Explicit xpath target check: //a[contains(text(), 'HOME')] */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('HOME', 'push_back');
            }}
            className="group inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#d95d39] hover:underline hover:scale-105 transition-transform"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            HOME
          </a>
        </div>

        <div className="bg-emerald-100 border border-emerald-400 text-emerald-900 font-mono text-[10px] uppercase font-semibold px-2 py-0.5 rounded-sm select-none">
          ★ INTERACTIVE TREE LIVE
        </div>
      </div>

      {/* Intro section */}
      <section className="space-y-3">
        <h2 className="text-3xl font-black text-black uppercase tracking-tight leading-none bg-[#ffd8be] inline-block px-3 py-1 border-2 border-black rotate-[-0.5deg]">
          THE LEWIS FAMILY TREE
        </h2>
        <p className="text-stone-800 text-sm max-w-3xl leading-relaxed">
          Welcome to our family tree! Here you can trace our family's three generations of pastors, business leaders, creators, students, and tech whizzes. Click on any card below to see their details!
        </p>
      </section>

      {/* Main interactive Tree Canvas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Visual Tree Box representation wrapper to isolate overflow */}
        <div className="lg:col-span-7 bg-[#fbf6ed] border-3 border-black rounded-lg brutal-shadow overflow-x-auto relative select-none">
          
          {/* Mobile Swipe indicator */}
          <div className="block sm:hidden bg-stone-900 text-yellow-105 text-[9px] font-mono text-center py-1.5 px-3 uppercase tracking-widest border-b border-black">
            ⚡️ Swipe to explore outer tree branches ↔
          </div>

          <div className="min-w-[580px] w-full p-6 relative scrapbook-grid flex flex-col justify-between min-h-[580px]">
            {/* Sincere tape stamp at the top */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 rotate-[-2deg] w-48 h-6 scrapbook-tape text-[9px] font-mono flex items-center justify-center font-bold text-black border border-black/10 select-none">
              📍 CLAN MAP
            </div>

            {/* GENERATION 1 (Parents - b. 1960 - 1969) */}
            <div className="space-y-3 pt-6 relative z-10 text-center">
              <div className="text-[10px] font-mono text-stone-500 tracking-widest font-extrabold uppercase mb-1">// PARENTS</div>
              <div className="flex justify-center gap-6">
                {[FAMILY_MEMBERS[0], FAMILY_MEMBERS[1]].map((member) => (
                  <div
                    key={member.id}
                    onClick={() => setActiveMemberId(member.id)}
                    className={`w-40 bg-white border-2 border-black p-2.5 rounded-sm transition-all duration-200 cursor-pointer ${
                      activeMemberId === member.id
                        ? 'ring-3 ring-black shadow-none translate-y-0.5 bg-yellow-100'
                        : 'hover:translate-y-[-2px] brutal-shadow-sm hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-10 h-10 object-cover border border-black rounded-xs"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-left leading-none">
                        <div className="font-extrabold text-xs text-black">{member.name.split(' ')[0]}</div>
                        <div className="text-[8px] font-mono text-stone-500 mt-1">{member.birthYear}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SVG Connection line container background representing biological links */}
            <div className="absolute inset-x-0 top-32 bottom-20 flex justify-center pointer-events-none z-0">
              <svg className="w-full h-full stroke-black stroke-[3] fill-none stroke-dasharray-[6]">
                {/* Branch connectors linking generation levels */}
                <path d="M 290 30 L 290 140 M 190 30 L 190 140 M 80 140 L 500 140 M 80 140 L 80 200 M 185 140 L 185 200 M 290 140 L 290 200 M 395 140 L 395 200 M 500 140 L 500 200 M 185 240 L 185 320 M 290 240 L 290 320" />
              </svg>
            </div>

            {/* GENERATION 2 (The Siblings - b. 1988 - 2005) */}
            <div className="space-y-3 relative z-10 py-8 text-center">
              <div className="text-[10px] font-mono text-stone-500 tracking-widest font-extrabold uppercase mb-1">// SIBLINGS</div>
              <div className="flex justify-center gap-2 flex-wrap">
                {[FAMILY_MEMBERS[2], FAMILY_MEMBERS[3], FAMILY_MEMBERS[4], FAMILY_MEMBERS[5], FAMILY_MEMBERS[6]].map((member) => (
                  <div
                    key={member.id}
                    onClick={() => setActiveMemberId(member.id)}
                    className={`w-28 bg-white border-2 border-black p-2 rounded-sm transition-all duration-200 cursor-pointer ${
                      activeMemberId === member.id
                        ? 'ring-3 ring-black shadow-none translate-y-0.5 bg-yellow-100'
                        : 'hover:translate-y-[-2px] brutal-shadow-sm hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-10 h-10 object-cover border border-black rounded-xs"
                        referrerPolicy="no-referrer"
                      />
                      <div className="leading-none">
                        <div className="font-extrabold text-[10px] text-black tracking-tight">{member.name.split(' ')[0]}</div>
                        <div className="text-[7.5px] font-mono text-stone-500 mt-1">b. {member.birthYear}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GENERATION 3 (The Niece - b. 2011) */}
            <div className="space-y-3 pb-4 relative z-10 text-center">
              <div className="text-[10px] font-mono text-stone-500 tracking-widest font-extrabold uppercase mb-1">// NIECE & GRANDDAUGHTER</div>
              <div className="flex justify-center">
                {[FAMILY_MEMBERS[7]].map((member) => (
                  <div
                    key={member.id}
                    onClick={() => setActiveMemberId(member.id)}
                    className={`w-44 bg-[#ffd6db] border-2 border-black p-2.5 rounded-sm transition-all duration-200 cursor-pointer ${
                      activeMemberId === member.id
                        ? 'ring-3 ring-black shadow-none translate-y-0.5 bg-[#ffebee]'
                        : 'hover:translate-y-[-2px] brutal-shadow-sm hover:bg-[#fff1f2]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-left">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-10 h-10 object-cover border-2 border-black rounded-xs"
                        referrerPolicy="no-referrer"
                      />
                      <div className="leading-none">
                        <div className="font-extrabold text-xs text-black">{member.name}</div>
                        <div className="text-[8.5px] font-mono text-stone-600 mt-0.5">Niece (b. {member.birthYear})</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Detailed credentials block of the active ancestor */}
        <div className="lg:col-span-5 bg-white border-3 border-black p-6 rounded-lg brutal-shadow flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-2 border-b-2 border-dashed border-stone-200 pb-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-stone-900 tracking-tight leading-none uppercase pt-1">
                  {activeMember.name}
                </h3>
                <div className="text-xs font-mono text-stone-500 font-semibold italic">
                  {activeMember.role}
                </div>
              </div>
              
              <img
                src={activeMember.avatarUrl}
                alt={activeMember.name}
                className="w-16 h-16 object-cover border-2 border-black rounded-sm shadow-sm rotate-[4deg]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Micro Vibe Card */}
            <div className="bg-[#f7f6f2] border-2 border-black p-4 brutal-shadow-sm rounded-sm space-y-3 relative">
              {/* Paper Clip Visual */}
              <div className="absolute -top-3 left-4 w-6 h-6 bg-stone-300 border border-black/40 rotate-[15deg] opacity-75 rounded-xs" />
              <div className="font-mono text-[10px] text-stone-500 font-bold uppercase tracking-wider block">
                ★ QUICK BIO
              </div>
              <p className="text-stone-800 text-xs leading-relaxed italic font-serif">
                "{activeMember.bio}"
              </p>
            </div>


          </div>

          <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col gap-2">
            <button
               onClick={() => onNavigate('PROFILES', 'push')}
              className="w-full bg-black hover:bg-stone-850 text-[#ffd8be] hover:text-white font-mono text-xs font-bold border-2 border-black py-2.5 px-4 rounded-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <BookOpen size={14} />
              VIEW FULL BIO CARD →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
