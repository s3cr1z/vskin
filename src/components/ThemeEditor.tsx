import React, { useState } from 'react';
import { ArrowRedo, ArrowUndo, Download, Upload, Save } from 'lucide-react';
import { ThemeData, TokenColorCategory, UIColorCategory } from '../types/theme';
import { tokenColorCategories, uiColorCategories } from '../data/colorCategories';
import { presets } from '../data/presets';
import { downloadTheme, checkColorContrast } from '../utils/themeGenerator';

interface ThemeEditorProps {
  theme: ThemeData;
  onUpdateColor: (colorKey: string, colorValue: string) => void;
  onUpdateToken: (tokenId: string, colorValue: string) => void;
  onApplyPreset: (uiColors: Record<string, string>, tokenColors: Record<string, string>) => void;
  onUpdateName: (name: string) => void;
  onImportTheme: (theme: ThemeData) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({
  theme,
  onUpdateColor,
  onUpdateToken,
  onApplyPreset,
  onUpdateName,
  onImportTheme,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}) => {
  const [activeTab, setActiveTab] = useState<'ui' | 'syntax' | 'presets'>('ui');
  const [themeName, setThemeName] = useState(theme.name);
  const [selectedPreset, setSelectedPreset] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThemeName(e.target.value);
  };

  const handleNameSave = () => {
    onUpdateName(themeName);
  };

  const handleThemeTypeChange = (type: 'dark' | 'light') => {
    // Apply UI colors for the theme type
    const baseColors = type === 'dark' 
      ? { "editor.background": "#1E1E1E", "editor.foreground": "#D4D4D4" }
      : { "editor.background": "#FFFFFF", "editor.foreground": "#000000" };
      
    onApplyPreset(baseColors, {});
  };

  const handleColorChange = (colorKey: string, colorValue: string, category?: string) => {
    if (category) {
      onUpdateToken(category, colorValue);
    } else {
      onUpdateColor(colorKey, colorValue);
    }
  };

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPreset(e.target.value);
    
    const preset = presets.find(p => p.id === e.target.value);
    if (preset) {
      onApplyPreset(preset.colors, preset.tokenColors);
    }
  };

  const handleImportTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const themeData = JSON.parse(event.target?.result as string) as ThemeData;
        onImportTheme(themeData);
        setThemeName(themeData.name);
      } catch (error) {
        alert('Invalid theme file format');
        console.error('Error parsing theme file:', error);
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    e.target.value = '';
  };

  const handleExportTheme = () => {
    downloadTheme(theme);
  };

  const renderUIColorEditor = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Base Theme</h3>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-md ${theme.type === 'dark' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handleThemeTypeChange('dark')}
            >
              Dark
            </button>
            <button
              className={`px-4 py-2 rounded-md ${theme.type === 'light' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handleThemeTypeChange('light')}
            >
              Light
            </button>
          </div>
        </div>

        {uiColorCategories.map((category) => (
          <div key={category.id} className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <span>{category.label}</span>
              <span className="ml-2 text-xs text-gray-500">{category.description}</span>
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {category.colorKeys.map((colorKey) => {
                const isBackground = colorKey.includes('background');
                const isForeground = colorKey.includes('foreground');
                const colorValue = theme.colors[colorKey] || '#000000';
                
                // Check contrast for foreground/background pairs
                let hasContrastIssue = false;
                if (isForeground && category.colorKeys.some(k => k.includes('background'))) {
                  const bgKey = category.colorKeys.find(k => k.includes('background'));
                  const bgColor = bgKey ? theme.colors[bgKey] : '';
                  if (bgColor) {
                    hasContrastIssue = !checkColorContrast(colorValue, bgColor);
                  }
                }
                
                return (
                  <div key={colorKey} className="flex items-center space-x-2">
                    <div className="w-24 text-xs truncate">{colorKey.split('.').pop()}</div>
                    <input
                      type="color"
                      value={colorValue}
                      onChange={(e) => handleColorChange(colorKey, e.target.value)}
                      className="w-8 h-8 rounded-md border border-gray-300"
                    />
                    <input
                      type="text"
                      value={colorValue}
                      onChange={(e) => handleColorChange(colorKey, e.target.value)}
                      className="text-xs px-2 py-1 border border-gray-300 rounded w-24 font-mono"
                    />
                    {hasContrastIssue && (
                      <span className="text-xs text-red-500">Low contrast</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSyntaxColorEditor = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Syntax Highlighting</h3>
        <div className="grid grid-cols-1 gap-4">
          {tokenColorCategories.map((category) => {
            // Find the token color from the theme
            const tokenColor = theme.tokenColors.find(token => 
              Array.isArray(token.scope) 
                ? token.scope.some(s => category.tokenScopes.includes(s))
                : category.tokenScopes.includes(token.scope)
            );
            
            const colorValue = tokenColor?.settings.foreground || category.defaultColor;
            
            return (
              <div key={category.id} className="flex items-center space-x-3">
                <div className="w-24 text-sm font-medium">{category.label}</div>
                <div className="w-48 text-xs text-gray-500 truncate">{category.description}</div>
                <input
                  type="color"
                  value={colorValue}
                  onChange={(e) => handleColorChange('', e.target.value, category.id)}
                  className="w-8 h-8 rounded-md border border-gray-300"
                />
                <input
                  type="text"
                  value={colorValue}
                  onChange={(e) => handleColorChange('', e.target.value, category.id)}
                  className="text-xs px-2 py-1 border border-gray-300 rounded w-24 font-mono"
                />
                <div 
                  className="h-6 font-mono text-xs px-2 flex items-center rounded"
                  style={{ 
                    backgroundColor: theme.colors["editor.background"] || '#1E1E1E',
                    color: colorValue 
                  }}
                >
                  {category.id === 'keywords' ? 'function' : 
                   category.id === 'strings' ? '"string"' : 
                   category.id === 'comments' ? '// comment' :
                   category.id === 'numbers' ? '42' : 
                   category.id}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderPresets = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Theme Presets</h3>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select a preset theme
          </label>
          <select
            value={selectedPreset}
            onChange={handlePresetChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
          >
            <option value="">-- Select a preset --</option>
            {presets.map(preset => (
              <option key={preset.id} value={preset.id}>
                {preset.name} ({preset.type})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-6">
          {presets.map(preset => (
            <div 
              key={preset.id}
              className="border border-gray-200 rounded-md p-4 cursor-pointer hover:border-purple-400 transition-colors"
              onClick={() => {
                setSelectedPreset(preset.id);
                onApplyPreset(preset.colors, preset.tokenColors);
              }}
            >
              <h4 className="font-medium">{preset.name}</h4>
              <p className="text-sm text-gray-500">{preset.description}</p>
              <div className="mt-2 flex space-x-2">
                {Object.values(preset.tokenColors).slice(0, 6).map((color, index) => (
                  <div 
                    key={index}
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="theme-editor flex flex-col h-full">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 items-center">
            <input
              type="text"
              value={themeName}
              onChange={handleNameChange}
              className="px-3 py-2 border border-gray-300 rounded-md text-base w-64"
              placeholder="Theme Name"
            />
            <button 
              onClick={handleNameSave}
              className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
              title="Save Theme Name"
            >
              <Save size={16} />
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={onUndo} 
              disabled={!canUndo}
              className={`p-2 rounded-md ${canUndo ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-100 text-gray-400 cursor-not-allowed'} transition-colors`}
              title="Undo"
            >
              <ArrowUndo size={16} />
            </button>
            <button 
              onClick={onRedo} 
              disabled={!canRedo}
              className={`p-2 rounded-md ${canRedo ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-100 text-gray-400 cursor-not-allowed'} transition-colors`}
              title="Redo"
            >
              <ArrowRedo size={16} />
            </button>
            <button 
              onClick={handleExportTheme}
              className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
              title="Export Theme"
            >
              <Download size={16} />
            </button>
            <label className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer">
              <Upload size={16} />
              <input
                type="file"
                accept=".json"
                onChange={handleImportTheme}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('ui')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ui'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              UI Elements
            </button>
            <button
              onClick={() => setActiveTab('syntax')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'syntax'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Syntax Highlighting
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'presets'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Presets
            </button>
          </nav>
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1 pr-2">
        {activeTab === 'ui' && renderUIColorEditor()}
        {activeTab === 'syntax' && renderSyntaxColorEditor()}
        {activeTab === 'presets' && renderPresets()}
      </div>
    </div>
  );
};

export default ThemeEditor;