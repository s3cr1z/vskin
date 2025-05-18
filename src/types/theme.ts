export interface TokenColor {
  name?: string;
  scope: string[] | string;
  settings: {
    foreground?: string;
    fontStyle?: string;
  };
}

export interface ColorSettings {
  [key: string]: string;
}

export interface ThemeData {
  name: string;
  type: 'dark' | 'light';
  colors: ColorSettings;
  tokenColors: TokenColor[];
}

export interface TokenColorCategory {
  id: string;
  label: string;
  description: string;
  tokenScopes: string[];
  defaultColor: string;
}

export interface UIColorCategory {
  id: string;
  label: string;
  description: string;
  colorKeys: string[];
  defaultColor: string;
}

export interface Preset {
  id: string;
  name: string;
  type: 'dark' | 'light';
  description: string;
  colors: Partial<ColorSettings>;
  tokenColors: Partial<Record<string, string>>;
}

export interface LanguageExample {
  id: string;
  name: string;
  code: string;
}