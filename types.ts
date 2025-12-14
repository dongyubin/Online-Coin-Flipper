import React from 'react';

export enum CoinSide {
  HEADS = 'HEADS',
  TAILS = 'TAILS',
}

export interface FlipResult {
  id: string;
  side: CoinSide;
  timestamp: number;
  question?: string; // If the user asked a question
  interpretation?: string; // AI response
}

export interface CoinStats {
  heads: number;
  tails: number;
  total: number;
  currentStreak: number;
  streakSide: CoinSide | null;
}

export interface CoinDefinition {
  id: string;
  name: string;
  country: string;
  frontColor: string; // Gradient string
  backColor: string; // Gradient string
  borderColor: string; // Tailwind class like border-yellow-300
  textColor: string; // Tailwind text color class
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
}