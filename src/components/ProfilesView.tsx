import React, { useState } from 'react';
import { ScreenId, FamilyMember } from '../types';
import { FAMILY_MEMBERS } from '../data';
import { Stars, ChevronRight } from 'lucide-react';

interface ProfilesViewProps {
  onNavigate: (screen: ScreenId, transition: 'push' | 'push_back' | 'slide_up') => void;
  selectedMemberId?: string | null;
  setSelectedMemberId: (id: string | null) => void;
}

// Memory trivia questions representing quotes or fun trivia snippets from FAMILY_MEMBERS
const TRIVIA_QUESTIONS = [
  {
    id: 1,
    quote: "Who of the family is the certified balance-sheet wizard and professional Accountant?",
    options: ['Sarah Lewis Victory', 'Sarah Joseph Orovwigho', 'Gift Oghenetega Orovwigho'],
    correct: 'Sarah Lewis Victory'
  },
  {
    id: 2,
    quote: "Who chooses to code exclusively in a customized Linux environment?",
    options: ['Daniel Lewis Oghenemaro', 'Gift Oghenetega Orovwigho', 'Jowoke Talabi'],
    correct: 'Daniel Lewis Oghenemaro'
  },
  {
    id: 3,
    quote: "Who is Racheal Lewis's brilliant daughter who loves to draw comics and code in Scratch?",
    options: ['Jowoke Talabi', 'Sarah Lewis Victory', 'Ejiro Orovwigho Blessing'],
    correct: 'Jowoke Talabi'
  }
];

export default function ProfilesView({ onNavigate, selectedMemberId, setSelectedMemberId }: ProfilesViewProps) {
  // Local active member selection
  const activeId = selectedMemberId || 'lewis-father';
  const activeMember = FAMILY_MEMBERS.find(m => m.id === activeId) || FAMILY_MEMBERS[0];

  // Trivia states
  const [currentTriviaIdx, setCurrentTriviaIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleTriviaAnswer = (ans: string) => {
    setSelectedAnswer(ans);
    const q = TRIVIA_QUESTIONS[currentTriviaIdx];
    if (ans === q.correct) {
      setFeedback('🎉 CORRECT! You know the Lewis family lore like a real pro.');
    } else {
      setFeedback(`❌ INCORRECT! The correct answer was "${q.correct}".`);
    }
  };

  const nextTrivia = () => {
    setSelectedAnswer(null);
    setFeedback(null);
    setCurrentTriviaIdx((currentTriviaIdx + 1) % TRIVIA_QUESTIONS.length);
  };

  return (
    <div className="space-y-10">
      {/* Banner introduction with dynamic visual components */}
      <section className="bg-[#faeed6] border-3 border-black p-6 rounded-lg brutal-shadow relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="space-y-3 flex-1">
          <h2 className="text-3xl font-black text-black uppercase tracking-tight">
            Family Bios & Story Cards
          </h2>
          <p className="text-stone-800 text-xs md:text-sm max-w-xl leading-relaxed">
            Select any family member on the left to see their quick bio and story card details!
          </p>
        </div>
      </section>

      {/* Main Container: Grid layout split between selection strip (Left) and detail zine page (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: List select strip */}
        <div className="lg:col-span-4 space-y-3">
          <div className="font-mono text-[10px] font-black text-stone-500 uppercase tracking-widest block ml-1">
            // FIND A FAMILY MEMBER
          </div>

          <div className="space-y-2.5">
            {FAMILY_MEMBERS.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMemberId(member.id)}
                className={`p-3.5 border-2 border-black rounded-md transition-all duration-150 cursor-pointer flex items-center gap-3 relative overflow-hidden ${
                  activeId === member.id
                    ? 'bg-black text-white brutal-shadow-sm translate-x-[2px] translate-y-[2px]'
                    : 'bg-white hover:bg-stone-50 text-stone-900 brutal-shadow'
                }`}
              >
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-12 h-12 object-cover border border-black rounded-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left leading-none flex-1">
                  <div className="font-black text-sm uppercase">{member.name}</div>
                  <div className={`text-[10px] font-mono mt-1 ${activeId === member.id ? 'text-stone-300' : 'text-stone-500'}`}>
                    b. {member.birthYear} // {member.generation.toUpperCase()}
                  </div>
                </div>

                <div className={`text-xs ${activeId === member.id ? 'text-[#ffbe9d]' : 'text-stone-400'}`}>
                  <ChevronRight size={16} className="stroke-[2.5]" />
                </div>
              </div>
            ))}
          </div>

          {/* Lore trivia challenge widget */}
          <div className="bg-[#fcfbf7] border-2 border-black p-4 brutal-shadow-sm rounded-md space-y-3 mt-6">
            <div className="flex items-center gap-1 text-[#d95d39]">
              <Stars size={14} className="animate-spin-slow stroke-[2.5]" />
              <span className="font-mono text-[10px] font-extrabold uppercase">FAMILY LORE QUIZ</span>
            </div>

            <p className="text-[11px] text-stone-800 leading-normal italic font-serif">
              "{TRIVIA_QUESTIONS[currentTriviaIdx].quote}"
            </p>

            <div className="space-y-1.5 pt-1">
              {TRIVIA_QUESTIONS[currentTriviaIdx].options.map((opt) => (
                <button
                  key={opt}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleTriviaAnswer(opt)}
                  className={`w-full text-left font-mono text-[10px] p-2 border border-black transition-colors rounded-xs ${
                    selectedAnswer === opt
                      ? opt === TRIVIA_QUESTIONS[currentTriviaIdx].correct
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-500'
                        : 'bg-red-100 text-red-900 border-red-500'
                      : 'bg-white hover:bg-stone-100 text-stone-800'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {feedback && (
              <div className="space-y-2 pt-1 animate-fade-in">
                <p className="text-[10px] font-mono font-bold leading-relaxed">{feedback}</p>
                <button
                  onClick={nextTrivia}
                  className="bg-black text-white font-mono text-[9px] font-bold border border-black px-2.5 py-1 hover:bg-stone-850"
                >
                  NEXT Lore Question →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Detailed visual layout of selected member */}
        <div className="lg:col-span-8 bg-white border-3 border-black p-6 md:p-8 rounded-lg brutal-shadow space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Upper profile panel */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b-2 border-dashed border-stone-200 pb-5">
              <div className="relative">
                <img
                  src={activeMember.avatarUrl}
                  alt={activeMember.name}
                  className="w-32 h-32 md:w-40 md:h-40 object-cover border-3 border-black rotate-[-3deg] shadow-lg rounded-xs"
                  referrerPolicy="no-referrer"
                />
                
                {/* Micro energy seal stamp on photog border */}
                <div className="absolute bottom-2 right-[-10px] rotate-[15deg] bg-yellow-400 border border-black text-[8px] font-mono font-black py-0.5 px-1.5 uppercase tracking-wide rounded-sm shadow-md select-none">
                  {activeMember.energyBadge}
                </div>
              </div>

              <div className="text-center sm:text-left space-y-2 flex-1 pt-2">
                <div className="inline-block bg-[#fed7aa] text-amber-950 font-mono text-[10px] border border-black/25 px-2 py-0.5 uppercase tracking-wider font-extrabold rounded-xs select-none">
                  RECORD // GEN_ID: {activeMember.generation.toUpperCase()} // SINCE {activeMember.birthYear}
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-stone-900 uppercase tracking-tight leading-none pt-1">
                  {activeMember.name}
                </h3>

                <p className="text-xs font-mono font-semibold text-stone-500 max-w-lg italic">
                  Primary Family Role: <span className="text-black not-italic font-bold">{activeMember.role}</span>
                </p>

                <p className="text-stone-700 text-xs leading-relaxed font-sans max-w-xl border-t border-stone-100 pt-3">
                  {activeMember.bio}
                </p>
              </div>
            </div>


          </div>

          <div className="pt-4 border-t border-stone-150 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] font-mono text-stone-500 uppercase">// MADE WITH ❤️ BY THE LEWIS FAMILY</span>
            <button
              onClick={() => onNavigate('HOME_WITH_TREE', 'push')}
              className="bg-black hover:bg-stone-850 text-[#fed7aa] font-mono text-xs font-bold border-2 border-black py-2 px-3.5 rounded-xs transition-colors flex items-center gap-1.5"
            >
              LOCATE ON FAMILY TREE →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
