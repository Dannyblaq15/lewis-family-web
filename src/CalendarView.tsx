import React, { useState, useEffect } from 'react';
import { ScreenId, TimelineEvent } from '../types';
import { TIMELINE_EVENTS, FAMILY_MEMBERS } from '../data';
import { 
  Calendar, 
  Tag, 
  ArrowRight, 
  Sparkles, 
  Filter, 
  ChevronRight, 
  ChevronLeft,
  User, 
  AlertTriangle, 
  Plus, 
  X, 
  Cake, 
  Trash2, 
  Clock, 
  CalendarDays, 
  RotateCcw,
  Sparkle,
  LayoutGrid,
  List
} from 'lucide-react';

interface CalendarViewProps {
  onNavigate: (screen: ScreenId, transition: 'push' | 'push_back' | 'slide_up') => void;
  setSelectedMemberId: (id: string | null) => void;
}

interface CalendarEvent {
  id: string;
  title: string;
  month: number; // 0-indexed
  day: number;
  description: string;
  category: 'birthday' | 'reunion' | 'vibe check' | 'milestone' | 'scandal';
  hostId?: string; // ID of the member hosting or catalyst
  isCustom?: boolean;
}

const DEFAULT_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'cal-marcus-y2k',
    title: "Gift's Retro Computer Setup",
    month: 11, // December
    day: 31,
    description: "Gift showcases retro circuit boards and connects classic computer terminals while enjoying Mother Sarah's hot baked snacks.",
    category: 'milestone',
    hostId: 'gift-first'
  },
  {
    id: 'cal-june-cobbler',
    title: "Sarah's Weekend Cooking Challenge",
    month: 5, // June
    day: 15,
    description: "Mother Sarah cooks up amazing family meals and treats, creating absolute food perfection for the house.",
    category: 'vibe check',
    hostId: 'sarah-mother'
  },
  {
    id: 'cal-sofia-rave',
    title: "Racheal's Polaroid & Story Day",
    month: 6, // July
    day: 20,
    description: "Racheal displays cool cameras and tells aesthetic design stories with classic ambient beats playing in the background.",
    category: 'reunion',
    hostId: 'racheal-second'
  },
  {
    id: 'cal-charles-radio',
    title: "Daniel's Mechanical Keyboard Build",
    month: 1, // February
    day: 10,
    description: "Daniel sets up custom computer terminals and compiles cool new Linux scripts to help speed up everyone's machines.",
    category: 'milestone',
    hostId: 'daniel-last'
  },
  {
    id: 'cal-maya-solstice',
    title: "Ejiro's Cocoa & Quiz Chilling",
    month: 5, // June
    day: 21,
    description: "Relaxing outdoors under cozy string lights, drinking hot cocoa while debating fun riddles and stats with Ejiro.",
    category: 'vibe check',
    hostId: 'ejiro-third'
  },
  {
    id: 'cal-sofia-vinyl',
    title: "Victory's Jazz & Soul Album Night",
    month: 3, // April
    day: 18,
    description: "Everyone gathers to play classic jazz, soul, and pop records curated and handpicked by Sarah Victory.",
    category: 'reunion',
    hostId: 'sarah-fourth'
  },
  {
    id: 'cal-spaghetti-scandal',
    title: "Father Lewis's Spicy Spaghetti Incident",
    month: 9, // October
    day: 12,
    description: "The funny day Dad accidentally used super spicy hot chilies instead of sweet bell peppers. The whole table shared happy tears!",
    category: 'scandal',
    hostId: 'lewis-father'
  }
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default function CalendarView({ onNavigate, setSelectedMemberId }: CalendarViewProps) {
  // Navigation tabs of the view
  const [viewMode, setViewMode] = useState<'calendar' | 'timeline'>('calendar');
  
  // Toggle style display mode for Calendar: Grid view vs List view
  const [calendarDisplayMode, setCalendarDisplayMode] = useState<'grid' | 'list'>('grid');
  
  // Chronology filter states inside Timeline
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Interactive current month/year for Calendar view (Default to May 2026 based on system metadata)
  const [currentMonth, setCurrentMonth] = useState<number>(4); // May
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [selectedDay, setSelectedDay] = useState<number | null>(27); // Default to current local day (27)

  // Calender Events list state
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('lewis-family-events');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Failed parsing custom lewis calendar events", err);
      }
    }
    return DEFAULT_CALENDAR_EVENTS;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('lewis-family-events', JSON.stringify(events));
  }, [events]);

  // Event Form State values
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCategory, setFormCategory] = useState<'reunion' | 'vibe check' | 'milestone' | 'scandal'>('vibe check');
  const [formHost, setFormHost] = useState('lewis-father');
  const [showEventForm, setShowEventForm] = useState(false);

  // Filter events based on selected category tag in the timeline mode
  const filteredTimelineEvents = filterCategory === 'all' 
    ? TIMELINE_EVENTS 
    : TIMELINE_EVENTS.filter(evt => evt.category === filterCategory);

  const handleEventCardClick = (actorId: string) => {
    setSelectedMemberId(actorId);
    onNavigate('PROFILES', 'push');
  };

  // Helper date queries
  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  // Navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
    setSelectedDay(null);
  };

  // Query events for a specific day in the selected month
  const getEventsForDate = (month: number, date: number) => {
    const dayEvents: CalendarEvent[] = [];

    // 1. Dynamic Birthday Mapping
    FAMILY_MEMBERS.forEach(m => {
      const bMonth = m.birthMonth;
      const bDay = m.birthDay;

      if (bMonth !== undefined && bDay !== undefined && bMonth === month && bDay === date) {
        dayEvents.push({
          id: `bday-${m.id}`,
          title: `🎈 ${m.name}'s Birthday Curation`,
          month: bMonth,
          day: bDay,
          description: `Big celebration for the clan's legendary occupant: ${m.role}! Pull out the premium vintage record pairing and start the banquet.`,
          category: 'birthday',
          hostId: m.id
        });
      }
    });

    // 2. Custom & Static Events Match
    events.forEach(e => {
      if (e.month === month && e.day === date) {
        dayEvents.push(e);
      }
    });

    return dayEvents;
  };

  // Compile list of all events for this month, ordered chronologically
  const getEventsForMonth = (month: number) => {
    const list: CalendarEvent[] = [];
    const days = getDaysInMonth(month, currentYear);
    for (let d = 1; d <= days; d++) {
      const dayEvts = getEventsForDate(month, d);
      list.push(...dayEvts);
    }
    return list.sort((a, b) => a.day - b.day);
  };

  // Form Submission
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || selectedDay === null) return;

    const newEvent: CalendarEvent = {
      id: `custom-event-${Date.now()}`,
      title: formTitle,
      month: currentMonth,
      day: selectedDay,
      description: formDesc || 'A lovely gathering recorded in the Mercer digital chronicles.',
      category: formCategory,
      hostId: formHost,
      isCustom: true
    };

    setEvents(prev => [...prev, newEvent]);
    setFormTitle('');
    setFormDesc('');
    setShowEventForm(false);
  };

  // Delete Custom Event
  const handleDeleteEvent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEvents(prev => prev.filter(evt => evt.id !== id));
  };

  // Reset Calendar to defaults
  const handleResetDefaults = () => {
    if (confirm("Reset calendar database? This will remove any added custom event logs.")) {
      setEvents(DEFAULT_CALENDAR_EVENTS);
      localStorage.setItem('lewis-family-events', JSON.stringify(DEFAULT_CALENDAR_EVENTS));
    }
  };

  // Calendar cells compiling
  const compileCells = () => {
    const firstDayIndex = getFirstDayOfMonth(currentMonth, currentYear);
    const totalDays = getDaysInMonth(currentMonth, currentYear);

    const prevMonthIdx = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYearVal = currentMonth === 0 ? currentYear - 1 : currentYear;
    const totalDaysPrev = getDaysInMonth(prevMonthIdx, prevYearVal);

    const nextMonthIdx = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYearVal = currentMonth === 11 ? currentYear + 1 : currentYear;

    const arr = [];

    // Prefix empty spaces with former month buffer
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = totalDaysPrev - i;
      arr.push({
        day: d,
        month: prevMonthIdx,
        year: prevYearVal,
        isCurrentMonth: false
      });
    }

    // Current month dates
    for (let i = 1; i <= totalDays; i++) {
      arr.push({
        day: i,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true
      });
    }

    // Remaining spaces for neat styling grid (to complete 42 elements)
    const remaining = 42 - arr.length;
    for (let i = 1; i <= remaining; i++) {
      arr.push({
        day: i,
        month: nextMonthIdx,
        year: nextYearVal,
        isCurrentMonth: false
      });
    }

    return arr;
  };

  const calendarDaysList = compileCells();

  // Selected Day info listing
  const selectedDayEvents = selectedDay !== null ? getEventsForDate(currentMonth, selectedDay) : [];

  // Vibe category styling
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'birthday':
        return { 
          bgStyle: 'bg-rose-100 text-rose-950 border-rose-500', 
          badgeStyle: 'bg-rose-500 text-white',
          dotStyle: 'bg-rose-500' 
        };
      case 'reunion':
        return { 
          bgStyle: 'bg-[#cfe9d4]/60 text-[#135d33] border-[#a1dbb1]', 
          badgeStyle: 'bg-[#135d33] text-white',
          dotStyle: 'bg-[#135d33]' 
        };
      case 'vibe check':
        return { 
          bgStyle: 'bg-amber-100 text-amber-950 border-amber-500', 
          badgeStyle: 'bg-amber-500 text-stone-900',
          dotStyle: 'bg-amber-500' 
        };
      case 'milestone':
        return { 
          bgStyle: 'bg-emerald-100 text-emerald-950 border-emerald-500', 
          badgeStyle: 'bg-emerald-500 text-white',
          dotStyle: 'bg-emerald-500' 
        };
      case 'scandal':
        return { 
          bgStyle: 'bg-red-100 text-red-950 border-red-500', 
          badgeStyle: 'bg-red-500 text-white',
          dotStyle: 'bg-red-500' 
        };
      default:
        return { 
          bgStyle: 'bg-stone-100 text-stone-900 border-stone-500', 
          badgeStyle: 'bg-stone-500 text-white',
          dotStyle: 'bg-stone-500' 
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Banner introduction with toggle selector */}
      <section className="bg-[#ffd8be] border-3 border-black p-5 md:p-6 rounded-lg brutal-shadow flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Tape highlight decoration */}
        <div className="absolute top-2 right-4 rotate-[5deg] w-28 h-6 scrapbook-tape text-[9px] font-mono flex items-center justify-center font-bold text-black border border-black/10 select-none">
          🕰️ MIX-TAPE TIME
        </div>

        <div className="space-y-2 flex-1">
          <div className="inline-flex items-center gap-1 bg-stone-900 text-white text-[10px] font-mono font-bold uppercase py-0.5 px-2 rounded-xs">
            MERCER SCHEDULER STATION // LIVE DATABASE
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight leading-none">
            {viewMode === 'calendar' ? 'The Rebels Family Calendar' : 'The Family Chronicle Timeline'}
          </h2>
          <p className="text-stone-850 text-xs md:text-sm max-w-2xl leading-relaxed font-sans">
            Tracking birthday feasting, annual raves, shortwave dials, and custom upcoming events. Click or toggle tabs to check the live scrapbook calendar coordinates.
          </p>
        </div>

        {/* Vintage Toggle Controls */}
        <div className="flex bg-stone-900 border-2 border-black p-1 rounded-sm shadow-sm select-none gap-1 shrink-0">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3.5 py-2 font-mono text-[11px] font-extrabold uppercase transition-all duration-150 rounded-xs flex items-center gap-1.5 ${
              viewMode === 'calendar'
                ? 'bg-yellow-100 text-black border border-black'
                : 'text-stone-400 hover:text-white bg-transparent border-transparent'
            }`}
          >
            <CalendarDays size={13} />
            Family Calendar
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-3.5 py-2 font-mono text-[11px] font-extrabold uppercase transition-all duration-150 rounded-xs flex items-center gap-1.5 ${
              viewMode === 'timeline'
                ? 'bg-yellow-100 text-black border border-black'
                : 'text-stone-400 hover:text-white bg-transparent border-transparent'
            }`}
          >
            <Clock size={13} />
            Historic Timeline
          </button>
        </div>
      </section>

      {/* RENDER MODE A: ACTIVE FAMILY CALENDAR */}
      {viewMode === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Calendar Left Module: Grid Board */}
          <div className="lg:col-span-8 bg-[#fcf7ed] border-3 border-black p-4 md:p-6 rounded-lg brutal-shadow scrapbook-grid space-y-5">
            
            {/* Calendar Month Header Controller */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-4 gap-4">
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] text-stone-600 block uppercase font-extrabold">// CALENDAR DATE NAVIGATION</span>
                <div className="flex items-center gap-2.5">
                  <h3 className="font-serif italic font-extrabold text-2xl md:text-3xl text-stone-900 flex items-center gap-2">
                    <span>{MONTH_NAMES[currentMonth]}</span>
                    <span className="not-italic font-mono text-xl text-[#d95d39] font-black">({currentYear})</span>
                  </h3>
                  <span className="hidden sm:inline-flex bg-stone-900 text-yellow-105 font-mono text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wide border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    {getEventsForMonth(currentMonth).length} EVENTS
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* DISPLAY MODE VIEW SWITCHER */}
                <div className="flex bg-stone-900 border-2 border-black p-0.5 rounded-sm select-none gap-0.5 mr-1 shadow-sm">
                  <button
                    onClick={() => setCalendarDisplayMode('grid')}
                    className={`p-1 px-2.5 font-mono text-[9px] font-extrabold uppercase transition-all duration-150 rounded-xs flex items-center gap-1 ${
                      calendarDisplayMode === 'grid'
                        ? 'bg-yellow-100 text-black border border-black/30'
                        : 'text-stone-400 hover:text-white bg-transparent border-transparent'
                    }`}
                    title="Grid Display"
                  >
                    <LayoutGrid size={11} />
                    <span className="hidden xs:inline">Grid</span>
                  </button>
                  <button
                    onClick={() => setCalendarDisplayMode('list')}
                    className={`p-1 px-2.5 font-mono text-[9px] font-extrabold uppercase transition-all duration-150 rounded-xs flex items-center gap-1 ${
                      calendarDisplayMode === 'list'
                        ? 'bg-yellow-100 text-black border border-black/30'
                        : 'text-stone-400 hover:text-white bg-transparent border-transparent'
                    }`}
                    title="List Display"
                  >
                    <List size={11} />
                    <span className="hidden xs:inline">List</span>
                  </button>
                </div>

                <button
                  onClick={handlePrevMonth}
                  className="p-1.5 bg-white hover:bg-stone-50 border-2 border-black rounded-sm active:translate-y-0.5 transition-all outline-hidden text-black shadow-xs"
                  title="Previous Month"
                >
                  <ChevronLeft size={18} className="stroke-[2.5]" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-1.5 bg-white hover:bg-stone-50 border-2 border-black rounded-sm active:translate-y-0.5 transition-all outline-hidden text-black shadow-xs"
                  title="Next Month"
                >
                  <ChevronRight size={18} className="stroke-[2.5]" />
                </button>
                <button 
                  onClick={() => {
                    setCurrentMonth(4);
                    setCurrentYear(2026);
                    setSelectedDay(27);
                  }}
                  className="px-2.5 py-1.5 bg-black text-white font-mono text-[10px] uppercase font-bold border-2 border-black rounded-sm hover:bg-stone-850 active:translate-y-0.5 transition-all shadow-xs"
                  title="Reset to Present"
                >
                  MAY '26
                </button>
              </div>
            </div>

            {/* Display View Rendering Modes */}
            {calendarDisplayMode === 'grid' ? (
              <>
                {/* Days of week titles */}
                <div className="grid grid-cols-7 gap-1 md:gap-2 text-center text-xs font-mono font-bold tracking-wider text-stone-600">
                  {DAYS_OF_WEEK.map(day => (
                    <div key={day} className="py-1 bg-stone-300/60 border border-black/10 rounded-xs select-none">
                      {day}
                    </div>
                  ))}
                </div>

                {/* 42 Calendar Cells Grid */}
                <div className="grid grid-cols-7 gap-1 md:gap-2">
                  {calendarDaysList.map((cell, idx) => {
                    const isSelected = selectedDay === cell.day && cell.isCurrentMonth;
                    const dateEvents = getEventsForDate(cell.month, cell.day);
                    const hasEvents = dateEvents.length > 0;
                    const isToday = cell.day === 27 && cell.month === 4 && cell.year === 2026; // Highlight today May 27, 2026

                    // Pick first birthday from day events to render a mini avatar sticker
                    const matchedBdayEvent = dateEvents.find(e => e.category === 'birthday');
                    const actorForBday = matchedBdayEvent 
                      ? FAMILY_MEMBERS.find(m => m.id === matchedBdayEvent.hostId) 
                      : null;

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (cell.isCurrentMonth) {
                            setSelectedDay(cell.day);
                          } else {
                            // Switch month and set selected day
                            setCurrentMonth(cell.month);
                            setCurrentYear(cell.year);
                            setSelectedDay(cell.day);
                          }
                        }}
                        className={`min-h-[72px] sm:min-h-[85px] border-2 rounded-xs p-1 flex flex-col justify-between transition-all duration-150 cursor-pointer select-none relative ${
                          cell.isCurrentMonth 
                            ? isSelected 
                              ? 'bg-[#ffd8be] border-black ring-2 ring-black brutal-shadow-sm scale-[1.01] z-10'
                              : isToday
                                ? 'bg-amber-100 border-[#d95d39] border-dashed text-stone-900 shadow-inner'
                                : 'bg-white border-stone-400 hover:border-black hover:bg-stone-50 text-stone-900'
                            : 'bg-stone-200/50 border-stone-300 text-stone-400 opacity-60'
                        }`}
                      >
                        {/* Day numerical listing */}
                        <div className="flex justify-between items-start">
                          <span className={`text-xs font-mono font-semibold ${
                            isToday ? 'bg-orange-600 text-white px-1 leading-normal rounded-xs' : ''
                          }`}>
                            {cell.day}
                          </span>

                          {/* Birthday Cake/Avatar bubble if matches */}
                          {actorForBday && (
                            <div className="relative group" title={`${actorForBday.name}'s Birthday!`}>
                              <img
                                src={actorForBday.avatarUrl}
                                alt={actorForBday.name}
                                className="w-5 h-5 rounded-full object-cover border border-black scale-105"
                                referrerPolicy="no-referrer"
                              />
                              <span className="absolute -bottom-1 -right-1 text-[8px] bg-white rounded-full p-0.5 border border-black shadow-xs leading-none">
                                🎂
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Short label dot badges inside current month cells */}
                        <div className="space-y-0.5 mt-1 overflow-visible">
                          {dateEvents.slice(0, 2).map((e, evIdx) => {
                            const styleTheme = getCategoryTheme(e.category);
                            // Don't show birthday double indicators inside cell if avatar exists
                            if (e.category === 'birthday' && actorForBday) return null;

                            return (
                              <div
                                key={evIdx}
                                className="hidden sm:block text-[8px] font-mono font-bold truncate px-1 rounded-sm border border-black/20 leading-tight"
                                style={{ 
                                  backgroundColor: e.category === 'scandal' ? '#fee2e2' : e.category === 'reunion' ? '#dcfce7' : '#fef3c7',
                                  color: e.category === 'scandal' ? '#991b1b' : e.category === 'reunion' ? '#166534' : '#92400e'
                                }}
                              >
                                {e.category === 'scandal' ? '💔 ' : e.category === 'reunion' ? '👥 ' : '✨ '}
                                {e.title.replace("Anniversary", "Anniv").replace("Incident", "").replace("Secret", "").slice(0, 15)}
                              </div>
                            );
                          })}

                          {/* Mobile indicators dots */}
                          <div className="flex flex-wrap gap-0.5 sm:hidden justify-end">
                            {dateEvents.map((e, evIdx) => {
                              const styleTheme = getCategoryTheme(e.category);
                              return (
                                <span 
                                  key={evIdx} 
                                  className={`w-1.5 h-1.5 rounded-full ${styleTheme.dotStyle}`} 
                                  title={e.title}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              /* Simple Agenda List View of Current Month events */
              <div className="space-y-3.5 max-h-[560px] overflow-y-auto pr-1">
                {getEventsForMonth(currentMonth).length > 0 ? (
                  getEventsForMonth(currentMonth).map((evt) => {
                    const style = getCategoryTheme(evt.category);
                    const host = FAMILY_MEMBERS.find(m => m.id === evt.hostId);
                    const isSelected = selectedDay === evt.day;

                    return (
                      <div 
                        key={evt.id}
                        onClick={() => setSelectedDay(evt.day)}
                        className={`border-2 border-black p-4 rounded-md relative transition-all duration-150 cursor-pointer hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none ${
                          isSelected 
                            ? 'bg-amber-100/70 border-black ring-2 ring-black brutal-shadow-sm scale-[1.005]' 
                            : 'bg-white hover:bg-stone-50 border-stone-400'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start sm:items-center gap-4 flex-1">
                            {/* Retro Stamp Style for Date */}
                            <div className="bg-stone-900 text-yellow-105 font-mono text-center p-2 border-2 border-black rounded-sm min-w-[70px] select-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0 self-start sm:self-center">
                              <div className="text-[9px] uppercase font-black tracking-wider leading-none">
                                {MONTH_NAMES[currentMonth].slice(0, 3)}
                              </div>
                              <div className="text-xl font-black leading-none mt-1">{evt.day}</div>
                            </div>
                            
                            {/* Title, Category Badge, & Description */}
                            <div className="space-y-1.5 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="font-sans font-bold text-sm text-stone-950 leading-tight">
                                  {evt.title}
                                </h4>
                                <span className={`font-mono text-[8px] font-black uppercase tracking-widest px-2 py-0.5 border border-black/30 rounded-full ${style.badgeStyle}`}>
                                  {evt.category}
                                </span>
                              </div>
                              <p className="text-stone-700 text-xs font-sans leading-relaxed">
                                {evt.description}
                              </p>
                            </div>
                          </div>

                          {/* Catalyst / Host & Optional Custom Delete button */}
                          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                            {host ? (
                              <div className="flex items-center gap-1.5 bg-[#f5ede0] border border-stone-300 p-1 px-2 rounded-md text-[10px] font-mono hover:border-black transition-colors">
                                <img
                                  src={host.avatarUrl}
                                  alt={host.name}
                                  className="w-4 h-4 object-cover rounded-full border border-black"
                                  referrerPolicy="no-referrer"
                                />
                                <span className="text-stone-605">Catalyst:</span>
                                <span className="text-stone-900 underline font-bold leading-none">{host.name}</span>
                              </div>
                            ) : (
                              evt.hostId && (
                                <div className="p-1 px-2.5 bg-stone-150 border border-stone-300 rounded-md text-[9px] font-mono text-stone-600">
                                  Agent: <span className="font-bold">{evt.hostId}</span>
                                </div>
                              )
                            )}

                            {evt.isCustom && (
                              <button
                                onClick={(e) => handleDeleteEvent(evt.id, e)}
                                className="text-stone-500 hover:text-red-650 p-1.5 hover:bg-red-50 rounded-full border border-stone-200 active:scale-90 transition-transform flex items-center justify-center bg-white"
                                title="Delete Custom Event"
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="border-3 border-dashed border-stone-400 rounded-lg p-10 text-center select-none bg-stone-100/50 space-y-4 max-w-lg mx-auto my-6">
                    <div className="text-4xl">📭</div>
                    <div>
                      <h5 className="font-mono text-xs font-black text-stone-700 uppercase tracking-widest">// NO CELEBRATIONS RECORDED</h5>
                      <p className="text-stone-550 text-xs max-w-sm mx-auto mt-2 leading-relaxed">
                        There are no birthday curations or custom events listed for {MONTH_NAMES[currentMonth].toUpperCase()} {currentYear} in the archive database. Click "Log Heirloom Event" to pin one!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Calendar Right Module: Insights & Adding Form */}
          <div className="lg:col-span-4 space-y-6">

            {/* Selected day log scrapbook note */}
            <div className="bg-white border-3 border-black p-5 rounded-lg brutal-shadow space-y-4 relative">

              <div className="border-b-2 border-dashed border-stone-200 pb-3">
                <span className="font-mono text-[9px] text-stone-550 uppercase font-extrabold flex items-center gap-1">
                  <Clock size={11} className="text-[#d95d39]" />
                  // MERCER ANCESTORS DAILY REPORT
                </span>
                <h4 className="font-serif italic font-black text-xl text-stone-900 mt-1">
                  {selectedDay !== null 
                    ? `${MONTH_NAMES[currentMonth]} ${selectedDay}, ${currentYear}`
                    : "No Day Selected"}
                </h4>
              </div>

              {/* Show events scheduled for selected date */}
              {selectedDay !== null ? (
                selectedDayEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDayEvents.map((evt) => {
                      const style = getCategoryTheme(evt.category);
                      const host = FAMILY_MEMBERS.find(m => m.id === evt.hostId);
                      
                      return (
                        <div 
                          key={evt.id} 
                          className={`border-2 border-black p-4 rounded-sm relative space-y-2.5 shadow-sm transition-transform hover:scale-102 ${style.bgStyle}`}
                        >
                          {/* Top row with Category Badge and Delete */}
                          <div className="flex items-center justify-between">
                            <span className={`font-mono text-[8px] font-black uppercase tracking-widest px-2 py-0.5 border border-black/40 rounded-full ${style.badgeStyle}`}>
                              {evt.category}
                            </span>

                            {evt.isCustom && (
                              <button
                                onClick={(e) => handleDeleteEvent(evt.id, e)}
                                className="text-stone-500 hover:text-red-650 p-1 hover:bg-red-50 rounded-full border border-transparent hover:border-black/10 active:scale-90 transition-transform"
                                title="Delete Custom Event"
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>

                          {/* Event details */}
                          <div className="space-y-1">
                            <h5 className="font-sans font-bold text-sm text-stone-900 leading-tight block">
                              {evt.title}
                            </h5>
                            <p className="text-stone-850 text-xs leading-relaxed font-sans mt-1">
                              {evt.description}
                            </p>
                          </div>

                          {/* Host indicator */}
                          {host ? (
                            <div className="pt-2 border-t border-dashed border-black/10 flex items-center gap-2 text-[10px] font-mono">
                              <img
                                src={host.avatarUrl}
                                alt={host.name}
                                className="w-5 h-5 object-cover rounded-full border border-black"
                                referrerPolicy="no-referrer"
                              />
                              <span>Catalyst: <span className="font-bold underline">{host.name}</span></span>
                            </div>
                          ) : (
                            evt.hostId && (
                              <div className="pt-1.5 border-t border-dashed border-black/10 text-[9px] font-mono text-stone-600">
                                Organised by: <span className="font-bold">{evt.hostId}</span>
                              </div>
                            )
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-stone-300 rounded-sm p-6 text-center select-none bg-[#fefefe]">
                    <span className="text-2xl block mb-2 opacity-65">😴</span>
                    <h5 className="font-mono text-[10.5px] font-bold text-stone-700 uppercase">NO EVENTS REGISTERED</h5>
                    <p className="text-stone-500 text-[10.5px] max-w-xs mx-auto mt-1 leading-normal font-sans">
                      This date has no recorded scrapbooking events or birthdays in the cache database yet.
                    </p>
                  </div>
                )
              ) : (
                <div className="text-center p-4">
                  <p className="font-mono text-xs text-stone-500">Pick any date block on the grid matrix to review details.</p>
                </div>
              )}

              {/* Form toggle buttons inside Post It */}
              {selectedDay !== null && !showEventForm && (
                <button
                  onClick={() => setShowEventForm(true)}
                  className="w-full bg-stone-950 hover:bg-black text-white font-mono text-xs font-bold border-2 border-black py-2.5 px-4 rounded-xs active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Plus size={14} className="stroke-[2.5]" />
                  LOG HEIRLOOM EVENT
                </button>
              )}
            </div>

            {/* Event Adding Index Form */}
            {selectedDay !== null && showEventForm && (
              <div className="bg-[#fefce8] border-3 border-black p-5 rounded-lg brutal-shadow space-y-4 animate-fade-in relative">
                {/* Paper clip visual icon */}
                <div className="absolute top-1 right-8 w-6 h-6 bg-stone-200 border border-black/30 rounded-xs rotate-[12deg] opacity-80" />

                <div className="flex items-center justify-between border-b border-black/10 pb-2">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-amber-700 uppercase font-black tracking-widest">// RECORDING NEW VIBE LOG</span>
                    <h5 className="font-sans font-bold text-xs text-stone-900">
                      ON {MONTH_NAMES[currentMonth].toUpperCase()} {selectedDay}, {currentYear}
                    </h5>
                  </div>
                  <button
                    onClick={() => setShowEventForm(false)}
                    className="p-1 hover:bg-amber-100 rounded-full border border-transparent hover:border-black/10 active:scale-95 transition"
                  >
                    <X size={14} className="stroke-[2.5]" />
                  </button>
                </div>

                <form onSubmit={handleAddEvent} className="space-y-3 font-mono text-xs">
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-bold text-stone-750">Event Brief Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Summer Pancake Feast"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full bg-white border-2 border-black p-2 font-mono text-xs focus:outline-hidden focus:ring-1 focus:ring-yellow-600 rounded-xs"
                      maxLength={50}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-bold text-stone-750">Lore Description *</label>
                    <textarea
                      required
                      placeholder="Tell the funny family lore, custom music pairing, and who got into double trouble..."
                      rows={3}
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      className="w-full bg-white border-2 border-black p-2 font-mono text-xs focus:outline-hidden focus:ring-1 focus:ring-yellow-600 rounded-xs font-sans"
                      maxLength={160}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase font-bold text-stone-750">Category</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as any)}
                        className="w-full bg-white border-2 border-black p-1.5 focus:outline-hidden font-mono text-[11px] rounded-xs"
                      >
                        <option value="vibe check">🎧 Vibe Check</option>
                        <option value="reunion">👥 Reunion</option>
                        <option value="milestone">📌 Milestone</option>
                        <option value="scandal">🔥 Scandal</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase font-bold text-stone-750">Event Host</label>
                      <select
                        value={formHost}
                        onChange={(e) => setFormHost(e.target.value)}
                        className="w-full bg-white border-2 border-black p-1.5 focus:outline-hidden font-mono text-[11px] rounded-xs"
                      >
                        <option value="Family Accord">👨‍👩‍👦 Universal</option>
                        {FAMILY_MEMBERS.map(m => (
                          <option key={m.id} value={m.id}>👤 {m.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-mono text-xs font-bold border-2 border-black py-2.5 rounded-xs mt-3 active:translate-y-0.5"
                  >
                    APPEND EXPLICIT LOG TO SYSTEM
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RENDER MODE B: CHRONIC CHRONOLOGY TIMELINE */}
      {viewMode === 'timeline' && (
        <div className="space-y-8">
          
          {/* Filter Toolbar aligned with neo-brutal scrapbook design */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-stone-300 pb-4">
            <div className="flex items-center gap-2 text-stone-750">
              <Filter size={14} className="stroke-[2.5]" />
              <span className="font-mono text-xs font-bold uppercase">FILTER CHRONOLOGY SEGMENT:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { key: 'all', label: 'All Logged Events' },
                { key: 'milestone', label: '📌 Milestones' },
                { key: 'achievement', label: '🏆 Achievements' },
                { key: 'scandal', label: '🔥 Drama & Scandals' },
                { key: 'vibe', label: '✨ Heritage Style Vibes' }
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setFilterCategory(cat.key)}
                  className={`px-3 py-1.5 border-2 border-black font-mono text-[11px] font-bold rounded-xs transition-colors hover:bg-stone-100 ${
                    filterCategory === cat.key
                      ? 'bg-black text-white hover:bg-stone-900'
                      : 'bg-white text-stone-850'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vertical Scrapbook Filmstrip Timeline */}
          <div className="relative border-l-3 border-dashed border-stone-400 pl-6 md:pl-10 ml-4 md:ml-8 space-y-8 py-4">
            {filteredTimelineEvents.map((evt, idx) => {
              const actor = FAMILY_MEMBERS.find(m => m.id === evt.primaryActorId);
              
              return (
                <div
                  key={evt.id}
                  onClick={() => handleEventCardClick(evt.primaryActorId)}
                  className="timeline-event-card relative bg-[#fcfbf7] border-3 border-black p-5 rounded-md brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-200 cursor-pointer group flex flex-col md:flex-row gap-5 items-start animate-fade-in"
                >
                  {/* Chronology bullet spot */}
                  <div className="absolute -left-[35px] md:-left-[51px] top-6 w-5 h-5 rounded-full border-3 border-black bg-[#fbcfe8] flex items-center justify-center z-10 group-hover:bg-[#d95d39] transition-colors shadow-xs">
                    <span className="w-1.5 h-1.5 bg-black rounded-full" />
                  </div>

                  {/* Large Stamp Year Display */}
                  <div className="text-left md:text-center shrink-0">
                    <div className="font-mono text-3xl font-black text-black bg-yellow-105 border-2 border-black px-3 py-1.5 rotate-[-4deg] group-hover:rotate-0 transition-transform brutal-shadow-sm select-none">
                      {evt.year}
                    </div>
                    <div className="font-mono text-[9px] uppercase font-bold text-stone-500 mt-2 tracking-widest text-[#d95d39]">
                      {evt.category} event
                    </div>
                  </div>

                  {/* Event Content Details */}
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-[#bae6fd] text-stone-950 font-mono text-[10px] font-bold border border-black/20 px-2 py-0.5 rounded-xs uppercase leading-none">
                        {evt.badge}
                      </span>
                      
                      {evt.category === 'scandal' && (
                        <span className="flex items-center gap-1 bg-red-100 text-red-850 text-[9px] font-semibold border-red-300 border px-1.5 py-0.5 rounded-sm">
                          <AlertTriangle size={8} />
                          HISTORIC CHAOS RISK
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-[#d95d39] transition-colors leading-snug">
                      {evt.title}
                    </h3>

                    <p className="text-stone-750 text-xs leading-relaxed max-w-3xl">
                      {evt.description}
                    </p>

                    {/* Actor Badge profile chip */}
                    {actor && (
                      <div className="inline-flex items-center gap-2 bg-[#eae7dc] border border-stone-300 p-1.5 pr-3.5 rounded-md text-xs font-mono font-semibold hover:border-black transition-colors">
                        <img
                          src={actor.avatarUrl}
                          alt={actor.name}
                          className="w-6 h-6 object-cover border border-black rounded-full"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-stone-605 text-[11px]">Main Catalyst:</span>
                        <span className="text-stone-900 text-[11px] underline font-bold">{actor.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 self-center hidden md:block text-stone-400 group-hover:text-black group-hover:translate-x-1.5 transition-all">
                    <ChevronRight size={21} className="stroke-[2.5]" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Fun stats for timeline curation */}
          <section className="bg-stone-55 border-2 border-black p-5 rounded-md flex flex-wrap items-center justify-around gap-6 select-none shadow-xs">
            <div className="text-center">
              <div className="font-serif italic text-3xl font-black text-black">71+ Years</div>
              <p className="font-mono text-[9.5px] text-stone-500 uppercase mt-1">Continuous Memory Stream</p>
            </div>
            <div className="h-8 w-px bg-stone-300 hidden md:block" />
            <div className="text-center">
              <div className="font-serif italic text-3xl font-black text-[#d95d39]">1955</div>
              <p className="font-mono text-[9.5px] text-stone-500 uppercase mt-1">Founding Migration Year</p>
            </div>
            <div className="h-8 w-px bg-stone-300 hidden md:block" />
            <div className="text-center">
              <div className="font-serif italic text-3xl font-black text-sky-600">6 Capsules</div>
              <p className="font-mono text-[9.5px] text-stone-500 uppercase mt-1">Digitally Rendered Logs</p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
