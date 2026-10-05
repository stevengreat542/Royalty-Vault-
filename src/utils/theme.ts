import { ThemeColor } from '../types/mining';

export interface ThemeStyles {
  primary: string;
  primaryHover: string;
  border: string;
  borderGlow: string;
  bgGradient: string;
  textAccent: string;
  badgeBg: string;
  badgeBorder: string;
  glowColor: string;
}

export const THEME_CONFIGS: Record<ThemeColor, ThemeStyles> = {
  amber: {
    primary: 'bg-amber-500 text-slate-950',
    primaryHover: 'hover:bg-amber-400',
    border: 'border-amber-500/40',
    borderGlow: 'border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.25)]',
    bgGradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
    textAccent: 'text-amber-400',
    badgeBg: 'bg-amber-500/10',
    badgeBorder: 'border-amber-500/30 text-amber-300',
    glowColor: '#f59e0b'
  },
  cyan: {
    primary: 'bg-cyan-500 text-slate-950',
    primaryHover: 'hover:bg-cyan-400',
    border: 'border-cyan-500/40',
    borderGlow: 'border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.25)]',
    bgGradient: 'from-cyan-500/10 via-cyan-500/5 to-transparent',
    textAccent: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/10',
    badgeBorder: 'border-cyan-500/30 text-cyan-300',
    glowColor: '#06b6d4'
  },
  purple: {
    primary: 'bg-purple-500 text-slate-950',
    primaryHover: 'hover:bg-purple-400',
    border: 'border-purple-500/40',
    borderGlow: 'border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.25)]',
    bgGradient: 'from-purple-500/10 via-purple-500/5 to-transparent',
    textAccent: 'text-purple-400',
    badgeBg: 'bg-purple-500/10',
    badgeBorder: 'border-purple-500/30 text-purple-300',
    glowColor: '#a855f7'
  },
  emerald: {
    primary: 'bg-emerald-500 text-slate-950',
    primaryHover: 'hover:bg-emerald-400',
    border: 'border-emerald-500/40',
    borderGlow: 'border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.25)]',
    bgGradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
    textAccent: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/30 text-emerald-300',
    glowColor: '#10b981'
  }
};
