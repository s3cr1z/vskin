import { ThemeData } from '../types/theme';

export const defaultDarkTheme: ThemeData = {
  name: "Custom Dark Theme",
  type: "dark",
  colors: {
    // Base colors
    "editor.background": "#1E1E1E",
    "editor.foreground": "#D4D4D4",
    "activityBar.background": "#333333",
    "activityBar.foreground": "#FFFFFF",
    "sideBar.background": "#252526",
    "sideBar.foreground": "#CCCCCC",
    "statusBar.background": "#007ACC",
    "statusBar.foreground": "#FFFFFF",
    "titleBar.activeBackground": "#3C3C3C",
    "titleBar.activeForeground": "#CCCCCC",
    "tab.activeBackground": "#1E1E1E",
    "tab.inactiveBackground": "#2D2D2D",
    "tab.activeForeground": "#FFFFFF",
    "tab.inactiveForeground": "#AAAAAA",
    "terminal.background": "#1E1E1E",
    "terminal.foreground": "#D4D4D4",
    "button.background": "#0E639C",
    "button.foreground": "#FFFFFF",
    "dropdown.background": "#3C3C3C",
    "dropdown.foreground": "#F0F0F0",
    "list.activeSelectionBackground": "#094771",
    "list.activeSelectionForeground": "#FFFFFF",
    "list.hoverBackground": "#2A2D2E",
    "menu.background": "#252526",
    "menu.foreground": "#CCCCCC",
    "editorGutter.background": "#1E1E1E",
    "editorLineNumber.foreground": "#858585",
    "editorLineNumber.activeForeground": "#C6C6C6",
    "panel.background": "#1E1E1E",
    "panel.border": "#80808059",
    "panelTitle.activeForeground": "#E7E7E7",
    "panelTitle.inactiveForeground": "#E7E7E799",
    "badge.background": "#4D4D4D",
    "badge.foreground": "#FFFFFF",
    "editorIndentGuide.background": "#404040",
    "editorIndentGuide.activeBackground": "#707070",
  },
  tokenColors: [
    {
      name: "Comments",
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#6A9955",
        fontStyle: "italic"
      }
    },
    {
      name: "Variables",
      scope: ["variable", "string constant.other.placeholder"],
      settings: {
        foreground: "#9CDCFE"
      }
    },
    {
      name: "Keywords",
      scope: ["keyword", "storage.type", "storage.modifier"],
      settings: {
        foreground: "#569CD6"
      }
    },
    {
      name: "Functions",
      scope: ["entity.name.function", "meta.function-call", "support.function"],
      settings: {
        foreground: "#DCDCAA"
      }
    },
    {
      name: "Classes, interfaces",
      scope: ["entity.name.type", "entity.other.inherited-class"],
      settings: {
        foreground: "#4EC9B0"
      }
    },
    {
      name: "String",
      scope: ["string", "punctuation.definition.string"],
      settings: {
        foreground: "#CE9178"
      }
    },
    {
      name: "Numbers",
      scope: ["constant.numeric"],
      settings: {
        foreground: "#B5CEA8"
      }
    },
    {
      name: "Constants, enums",
      scope: ["constant.language", "support.constant"],
      settings: {
        foreground: "#569CD6"
      }
    },
    {
      name: "Attributes",
      scope: ["entity.other.attribute-name"],
      settings: {
        foreground: "#9CDCFE"
      }
    },
    {
      name: "HTML tags",
      scope: ["entity.name.tag", "meta.tag.sgml"],
      settings: {
        foreground: "#569CD6"
      }
    },
  ]
};

export const defaultLightTheme: ThemeData = {
  name: "Custom Light Theme",
  type: "light",
  colors: {
    // Base colors
    "editor.background": "#FFFFFF",
    "editor.foreground": "#000000",
    "activityBar.background": "#2C2C2C",
    "activityBar.foreground": "#FFFFFF",
    "sideBar.background": "#F3F3F3",
    "sideBar.foreground": "#333333",
    "statusBar.background": "#007ACC",
    "statusBar.foreground": "#FFFFFF",
    "titleBar.activeBackground": "#DDDDDD",
    "titleBar.activeForeground": "#333333",
    "tab.activeBackground": "#FFFFFF",
    "tab.inactiveBackground": "#ECECEC",
    "tab.activeForeground": "#333333",
    "tab.inactiveForeground": "#777777",
    "terminal.background": "#FFFFFF",
    "terminal.foreground": "#333333",
    "button.background": "#007ACC",
    "button.foreground": "#FFFFFF",
    "dropdown.background": "#FFFFFF",
    "dropdown.foreground": "#616161",
    "list.activeSelectionBackground": "#007ACC",
    "list.activeSelectionForeground": "#FFFFFF",
    "list.hoverBackground": "#E8E8E8",
    "menu.background": "#FFFFFF",
    "menu.foreground": "#333333",
    "editorGutter.background": "#FFFFFF",
    "editorLineNumber.foreground": "#909090",
    "editorLineNumber.activeForeground": "#222222",
    "panel.background": "#FFFFFF",
    "panel.border": "#80808059",
    "panelTitle.activeForeground": "#333333",
    "panelTitle.inactiveForeground": "#757575",
    "badge.background": "#C8C8C8",
    "badge.foreground": "#333333",
    "editorIndentGuide.background": "#D3D3D3",
    "editorIndentGuide.activeBackground": "#AAAAAA",
  },
  tokenColors: [
    {
      name: "Comments",
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#008000",
        fontStyle: "italic"
      }
    },
    {
      name: "Variables",
      scope: ["variable", "string constant.other.placeholder"],
      settings: {
        foreground: "#001080"
      }
    },
    {
      name: "Keywords",
      scope: ["keyword", "storage.type", "storage.modifier"],
      settings: {
        foreground: "#0000FF"
      }
    },
    {
      name: "Functions",
      scope: ["entity.name.function", "meta.function-call", "support.function"],
      settings: {
        foreground: "#795E26"
      }
    },
    {
      name: "Classes, interfaces",
      scope: ["entity.name.type", "entity.other.inherited-class"],
      settings: {
        foreground: "#267f99"
      }
    },
    {
      name: "String",
      scope: ["string", "punctuation.definition.string"],
      settings: {
        foreground: "#A31515"
      }
    },
    {
      name: "Numbers",
      scope: ["constant.numeric"],
      settings: {
        foreground: "#098658"
      }
    },
    {
      name: "Constants, enums",
      scope: ["constant.language", "support.constant"],
      settings: {
        foreground: "#0000FF"
      }
    },
    {
      name: "Attributes",
      scope: ["entity.other.attribute-name"],
      settings: {
        foreground: "#FF0000"
      }
    },
    {
      name: "HTML tags",
      scope: ["entity.name.tag", "meta.tag.sgml"],
      settings: {
        foreground: "#800000"
      }
    },
  ]
};