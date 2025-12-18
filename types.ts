
// Fix: Import React to resolve 'Cannot find namespace React' errors
import React from 'react';

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface InteractiveContact {
  type: string;
  label: string;
  value: string; // The content for QR code
  link: string;  // The click link
  icon: React.ReactNode;
}

export interface UserProfile {
  name: string;
  title: string;
  bio: string;
  id: string;
  skills: Skill[];
  socials: SocialLink[];
  avatar: string;
  interactiveContacts: InteractiveContact[];
}