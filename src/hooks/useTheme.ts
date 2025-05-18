import { useState, useEffect } from 'react';
import { ThemeData } from '../types/theme';
import { createNewTheme, updateThemeColor, updateTokenColor, applyPresetColors } from '../utils/themeGenerator';
import { defaultDarkTheme } from '../data/defaultTheme';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeData>(defaultDarkTheme);
  const [themeHistory, setThemeHistory] = useState<ThemeData[]>([defaultDarkTheme]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  useEffect(() => {
    // Save current theme to localStorage
    localStorage.setItem('vscode-theme', JSON.stringify(theme));
  }, [theme]);

  // Initialize theme from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem('vscode-theme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme) as ThemeData;
        setTheme(parsedTheme);
        setThemeHistory([parsedTheme]);
      } catch (e) {
        console.error('Failed to parse saved theme', e);
      }
    }
  }, []);

  const createTheme = (name: string, type: 'dark' | 'light') => {
    const newTheme = createNewTheme(name, type);
    setTheme(newTheme);
    
    // Add to history
    setThemeHistory(prev => [...prev.slice(0, historyIndex + 1), newTheme]);
    setHistoryIndex(prev => prev + 1);
    
    return newTheme;
  };

  const updateColor = (colorKey: string, colorValue: string) => {
    const updatedTheme = updateThemeColor(theme, colorKey, colorValue);
    setTheme(updatedTheme);
    
    // Add to history
    setThemeHistory(prev => [...prev.slice(0, historyIndex + 1), updatedTheme]);
    setHistoryIndex(prev => prev + 1);
    
    return updatedTheme;
  };

  const updateToken = (tokenId: string, colorValue: string) => {
    const updatedTheme = updateTokenColor(theme, tokenId, colorValue);
    setTheme(updatedTheme);
    
    // Add to history
    setThemeHistory(prev => [...prev.slice(0, historyIndex + 1), updatedTheme]);
    setHistoryIndex(prev => prev + 1);
    
    return updatedTheme;
  };

  const applyPreset = (uiColors: Record<string, string>, tokenColors: Record<string, string>) => {
    const updatedTheme = applyPresetColors(theme, uiColors, tokenColors);
    setTheme(updatedTheme);
    
    // Add to history
    setThemeHistory(prev => [...prev.slice(0, historyIndex + 1), updatedTheme]);
    setHistoryIndex(prev => prev + 1);
    
    return updatedTheme;
  };

  const updateThemeName = (name: string) => {
    const updatedTheme = { ...theme, name };
    setTheme(updatedTheme);
    
    // Add to history
    setThemeHistory(prev => [...prev.slice(0, historyIndex + 1), updatedTheme]);
    setHistoryIndex(prev => prev + 1);
    
    return updatedTheme;
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setTheme(themeHistory[historyIndex - 1]);
      return themeHistory[historyIndex - 1];
    }
    return theme;
  };

  const redo = () => {
    if (historyIndex < themeHistory.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setTheme(themeHistory[historyIndex + 1]);
      return themeHistory[historyIndex + 1];
    }
    return theme;
  };

  const importTheme = (themeData: ThemeData) => {
    setTheme(themeData);
    
    // Add to history
    setThemeHistory(prev => [...prev.slice(0, historyIndex + 1), themeData]);
    setHistoryIndex(prev => prev + 1);
    
    return themeData;
  };

  return {
    theme,
    createTheme,
    updateColor,
    updateToken,
    applyPreset,
    updateThemeName,
    undo,
    redo,
    importTheme,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < themeHistory.length - 1
  };
}