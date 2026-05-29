// Types for HeritageHome App

export type ScreenId =
  | 'HOME'
  | 'HOME_WITH_TREE'
  | 'CALENDAR'
  | 'PROFILES';

export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  birthYear: number;
  deathYear?: number;
  generation: 'silents' | 'boomers' | 'genx' | 'millennials' | 'genz';
  energyBadge: string;
  avatarUrl: string;
  bio: string;
  funFacts: string[];
  vibeStats: {
    wisdom: number;
    rebellion: number;
    techLevel: number;
    style: number;
  };
  favVinyl?: string;
  birthMonth?: number;
  birthDay?: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  date: string;
  type: 'photo' | 'letter' | 'audio' | 'artifact';
  imageUrl: string;
  description: string;
  curatorNote: string;
  tags: string[];
  votedAesthetic?: number;
}

export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  primaryActorId: string; // References FamilyMember.id for the navigation
  iconName: string;
  badge: string;
  category: 'milestone' | 'scandal' | 'achievement' | 'vibe';
}
