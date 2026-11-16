import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_PORTFOLIO } from '../data/defaultPortfolio';
import type { PortfolioData } from '../types/portfolio';

const STORAGE_KEY = 'gobika_portfolio_data_v1';
const THEME_KEY = 'gobika_portfolio_theme_v1';

export function usePersistentPortfolio() {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PortfolioData>;
        return {
          ...DEFAULT_PORTFOLIO,
          ...parsed,
          profile: { ...DEFAULT_PORTFOLIO.profile, ...(parsed.profile ?? {}) },
          contact: { ...DEFAULT_PORTFOLIO.contact, ...(parsed.contact ?? {}) },
          skills: parsed.skills ?? DEFAULT_PORTFOLIO.skills,
          projects: parsed.projects ?? DEFAULT_PORTFOLIO.projects,
          education: parsed.education ?? DEFAULT_PORTFOLIO.education,
          achievements: parsed.achievements ?? DEFAULT_PORTFOLIO.achievements,
        };
      }
    } catch {
      // Fall back safely to defaults
    }
    return DEFAULT_PORTFOLIO;
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'dark';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore quota errors
    }
  }, [data]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const resetPortfolio = useCallback(() => {
    setData(DEFAULT_PORTFOLIO);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return {
    data,
    setData,
    theme,
    toggleTheme,
    resetPortfolio,
  };
}
