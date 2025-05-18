import React, { useState } from 'react';
import { ThemeData } from '../types/theme';
import { languageExamples } from '../data/languageExamples';

interface ThemePreviewProps {
  theme: ThemeData;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ theme }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languageExamples[0].id);

  const getTokenColor = (tokenType: string): string => {
    let color = theme.colors["editor.foreground"];
    
    for (const token of theme.tokenColors) {
      const scopes = Array.isArray(token.scope) ? token.scope : [token.scope];
      if (scopes.some(scope => tokenType.includes(scope))) {
        color = token.settings.foreground || color;
        break;
      }
    }
    
    return color;
  };

  const getLanguageExample = () => {
    return languageExamples.find(lang => lang.id === selectedLanguage) || languageExamples[0];
  };

  // Simple syntax highlighting simulation
  const renderCode = (code: string) => {
    // This is a simplified approach - a real implementation would use a proper syntax highlighter
    const commentRegex = /(\/\/.*|\/\*[\s\S]*?\*\/|#.*)/g;
    const stringRegex = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g;
    const keywordRegex = /\b(class|function|const|let|var|if|else|for|while|return|import|export|from|static|extends|implements|interface|type|new|this|super|try|catch|finally|throw|null|undefined|true|false)\b/g;
    const functionRegex = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;
    const numberRegex = /\b(0x[a-fA-F0-9]+|0o[0-7]+|0b[01]+|[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?)\b/g;
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)/g;
    const attributeRegex = /\s([a-zA-Z][a-zA-Z0-9]*)\s*=/g;

    let html = code
      // Replace to temporary placeholders to avoid conflicts
      .replace(commentRegex, match => `___COMMENT___${match}___COMMENT___`)
      .replace(stringRegex, match => `___STRING___${match}___STRING___`)
      .replace(numberRegex, match => `___NUMBER___${match}___NUMBER___`)
      .replace(keywordRegex, match => `___KEYWORD___${match}___KEYWORD___`)
      .replace(functionRegex, match => `___FUNCTION___${match}___FUNCTION___`)
      .replace(tagRegex, match => `___TAG___${match}___TAG___`)
      .replace(attributeRegex, match => `___ATTRIBUTE___${match}___ATTRIBUTE___`);
    
    // Replace placeholders with styled spans
    html = html
      .replace(/___COMMENT___([\s\S]*?)___COMMENT___/g, match => {
        const content = match.replace(/___COMMENT___/g, '');
        return `<span style="color:${getTokenColor('comment')}">${content}</span>`;
      })
      .replace(/___STRING___([\s\S]*?)___STRING___/g, match => {
        const content = match.replace(/___STRING___/g, '');
        return `<span style="color:${getTokenColor('string')}">${content}</span>`;
      })
      .replace(/___NUMBER___([\s\S]*?)___NUMBER___/g, match => {
        const content = match.replace(/___NUMBER___/g, '');
        return `<span style="color:${getTokenColor('constant.numeric')}">${content}</span>`;
      })
      .replace(/___KEYWORD___([\s\S]*?)___KEYWORD___/g, match => {
        const content = match.replace(/___KEYWORD___/g, '');
        return `<span style="color:${getTokenColor('keyword')}">${content}</span>`;
      })
      .replace(/___FUNCTION___([\s\S]*?)___FUNCTION___/g, match => {
        const content = match.replace(/___FUNCTION___/g, '');
        return `<span style="color:${getTokenColor('entity.name.function')}">${content}</span>`;
      })
      .replace(/___TAG___([\s\S]*?)___TAG___/g, match => {
        const content = match.replace(/___TAG___/g, '');
        return `<span style="color:${getTokenColor('entity.name.tag')}">${content}</span>`;
      })
      .replace(/___ATTRIBUTE___([\s\S]*?)___ATTRIBUTE___/g, match => {
        const content = match.replace(/___ATTRIBUTE___/g, '');
        return `<span style="color:${getTokenColor('entity.other.attribute-name')}">${content}</span>`;
      });
      
    return html;
  };

  const currentExample = getLanguageExample();

  return (
    <div className="theme-preview rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
      {/* VS Code-like title bar */}
      <div 
        className="flex items-center px-4 py-2 text-sm"
        style={{ 
          backgroundColor: theme.colors["titleBar.activeBackground"],
          color: theme.colors["titleBar.activeForeground"]
        }}
      >
        <div className="flex-1">{theme.name} - Visual Studio Code</div>
      </div>
      
      {/* Activity bar */}
      <div className="flex flex-1 overflow-hidden">
        <div 
          className="w-12 flex flex-col items-center py-4 space-y-6"
          style={{ 
            backgroundColor: theme.colors["activityBar.background"],
            color: theme.colors["activityBar.foreground"]
          }}
        >
          <div className="w-6 h-6 rounded opacity-80 cursor-pointer"></div>
          <div className="w-6 h-6 rounded opacity-80 cursor-pointer"></div>
          <div className="w-6 h-6 rounded opacity-80 cursor-pointer"></div>
          <div className="w-6 h-6 rounded opacity-80 cursor-pointer"></div>
        </div>
        
        {/* Sidebar */}
        <div 
          className="w-48 border-r"
          style={{ 
            backgroundColor: theme.colors["sideBar.background"],
            color: theme.colors["sideBar.foreground"],
            borderColor: theme.colors["sideBar.border"] || 'rgba(128, 128, 128, 0.35)'
          }}
        >
          <div className="p-2 text-sm font-medium">EXPLORER</div>
          <div className="px-2 py-1 text-xs opacity-80">PROJECT</div>
          <div className="px-4 py-1 text-xs truncate">src</div>
          <div className="px-6 py-1 text-xs truncate">components</div>
          <div className="px-6 py-1 text-xs truncate">utils</div>
          <div className="px-4 py-1 text-xs truncate">package.json</div>
          <div className="px-4 py-1 text-xs truncate">README.md</div>
        </div>
        
        {/* Editor area */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div 
            className="flex text-xs border-b"
            style={{ 
              backgroundColor: theme.colors["tab.inactiveBackground"],
              color: theme.colors["tab.inactiveForeground"],
              borderColor: 'rgba(128, 128, 128, 0.35)'
            }}
          >
            <div 
              className="px-4 py-2"
              style={{ 
                backgroundColor: theme.colors["tab.activeBackground"],
                color: theme.colors["tab.activeForeground"]
              }}
            >
              example.{selectedLanguage}
            </div>
            <div className="px-4 py-2">config.json</div>
          </div>
          
          {/* Editor content with language selector */}
          <div 
            className="flex-1 overflow-auto font-mono text-sm p-4"
            style={{ 
              backgroundColor: theme.colors["editor.background"],
              color: theme.colors["editor.foreground"]
            }}
          >
            <div className="mb-4">
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="text-xs py-1 px-2 rounded bg-opacity-20 bg-black text-white"
              >
                {languageExamples.map(lang => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            
            <pre className="overflow-x-auto">
              <code dangerouslySetInnerHTML={{ __html: renderCode(currentExample.code) }}></code>
            </pre>
          </div>
          
          {/* Status bar */}
          <div 
            className="flex justify-between items-center text-xs px-4 py-1"
            style={{ 
              backgroundColor: theme.colors["statusBar.background"],
              color: theme.colors["statusBar.foreground"]
            }}
          >
            <div>main</div>
            <div className="flex space-x-4">
              <span>Ln 1, Col 1</span>
              <span>Spaces: 2</span>
              <span>UTF-8</span>
              <span>{currentExample.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;