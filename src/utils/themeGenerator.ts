import { ThemeData, TokenColor } from '../types/theme';
import { tokenColorCategories } from '../data/colorCategories';
import { defaultDarkTheme, defaultLightTheme } from '../data/defaultTheme';

export function createNewTheme(name: string, type: 'dark' | 'light'): ThemeData {
  return type === 'dark' ? { ...defaultDarkTheme, name } : { ...defaultLightTheme, name };
}

export function updateThemeColor(theme: ThemeData, colorKey: string, colorValue: string): ThemeData {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      [colorKey]: colorValue
    }
  };
}

export function updateTokenColor(theme: ThemeData, tokenId: string, colorValue: string): ThemeData {
  const tokenCategory = tokenColorCategories.find(cat => cat.id === tokenId);
  
  if (!tokenCategory) {
    return theme;
  }

  const newTokenColors = [...theme.tokenColors];
  
  // Find if token color already exists
  const existingIndex = newTokenColors.findIndex(
    token => Array.isArray(token.scope) 
      ? token.scope.some(s => tokenCategory.tokenScopes.includes(s))
      : tokenCategory.tokenScopes.includes(token.scope)
  );

  if (existingIndex >= 0) {
    newTokenColors[existingIndex] = {
      ...newTokenColors[existingIndex],
      settings: {
        ...newTokenColors[existingIndex].settings,
        foreground: colorValue
      }
    };
  } else {
    newTokenColors.push({
      name: tokenCategory.label,
      scope: tokenCategory.tokenScopes,
      settings: {
        foreground: colorValue
      }
    });
  }

  return {
    ...theme,
    tokenColors: newTokenColors
  };
}

export function applyPresetColors(theme: ThemeData, uiColors: Record<string, string>, tokenColors: Record<string, string>): ThemeData {
  let updatedTheme = { ...theme };
  
  // Apply UI colors
  for (const [key, value] of Object.entries(uiColors)) {
    updatedTheme = updateThemeColor(updatedTheme, key, value);
  }
  
  // Apply token colors
  for (const [tokenId, color] of Object.entries(tokenColors)) {
    updatedTheme = updateTokenColor(updatedTheme, tokenId, color);
  }
  
  return updatedTheme;
}

export function generateThemeFile(theme: ThemeData): string {
  return JSON.stringify(theme, null, 2);
}

export function downloadTheme(theme: ThemeData): void {
  const themeData = generateThemeFile(theme);
  const blob = new Blob([themeData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-color-theme.json`;
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

export function checkColorContrast(foreground: string, background: string): boolean {
  // Convert hex to RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    const sanitizedHex = hex.startsWith('#') ? hex.slice(1) : hex;
    const r = parseInt(sanitizedHex.substr(0, 2), 16);
    const g = parseInt(sanitizedHex.substr(2, 2), 16);
    const b = parseInt(sanitizedHex.substr(4, 2), 16);
    return [r, g, b];
  };
  
  // Calculate relative luminance
  const calculateLuminance = (r: number, g: number, b: number): number => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };
  
  try {
    const rgb1 = hexToRgb(foreground);
    const rgb2 = hexToRgb(background);
    
    const l1 = calculateLuminance(rgb1[0], rgb1[1], rgb1[2]);
    const l2 = calculateLuminance(rgb2[0], rgb2[1], rgb2[2]);
    
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    
    // WCAG AA requires a contrast ratio of at least 4.5:1 for normal text
    return ratio >= 4.5;
  } catch (e) {
    return false;
  }
}