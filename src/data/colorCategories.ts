import { TokenColorCategory, UIColorCategory } from '../types/theme';

export const tokenColorCategories: TokenColorCategory[] = [
  {
    id: "comments",
    label: "Comments",
    description: "Comments and documentation",
    tokenScopes: ["comment", "punctuation.definition.comment"],
    defaultColor: "#6A9955"
  },
  {
    id: "variables",
    label: "Variables",
    description: "Variable names and references",
    tokenScopes: ["variable", "string constant.other.placeholder"],
    defaultColor: "#9CDCFE"
  },
  {
    id: "keywords",
    label: "Keywords",
    description: "Language keywords, storage types and modifiers",
    tokenScopes: ["keyword", "storage.type", "storage.modifier"],
    defaultColor: "#569CD6"
  },
  {
    id: "functions",
    label: "Functions",
    description: "Function names and calls",
    tokenScopes: ["entity.name.function", "meta.function-call", "support.function"],
    defaultColor: "#DCDCAA"
  },
  {
    id: "classes",
    label: "Classes",
    description: "Class, interface, and type names",
    tokenScopes: ["entity.name.type", "entity.other.inherited-class"],
    defaultColor: "#4EC9B0"
  },
  {
    id: "strings",
    label: "Strings",
    description: "String literals and text content",
    tokenScopes: ["string", "punctuation.definition.string"],
    defaultColor: "#CE9178"
  },
  {
    id: "numbers",
    label: "Numbers",
    description: "Numeric literals and constants",
    tokenScopes: ["constant.numeric"],
    defaultColor: "#B5CEA8"
  },
  {
    id: "constants",
    label: "Constants",
    description: "Language constants and enum values",
    tokenScopes: ["constant.language", "support.constant"],
    defaultColor: "#569CD6"
  },
  {
    id: "attributes",
    label: "Attributes",
    description: "Attribute names and property names",
    tokenScopes: ["entity.other.attribute-name"],
    defaultColor: "#9CDCFE"
  },
  {
    id: "tags",
    label: "HTML Tags",
    description: "HTML and XML tags",
    tokenScopes: ["entity.name.tag", "meta.tag.sgml"],
    defaultColor: "#569CD6"
  },
];

export const uiColorCategories: UIColorCategory[] = [
  {
    id: "editor",
    label: "Editor",
    description: "Main editor area colors",
    colorKeys: ["editor.background", "editor.foreground"],
    defaultColor: "#1E1E1E"
  },
  {
    id: "activityBar",
    label: "Activity Bar",
    description: "Left sidebar activity bar",
    colorKeys: ["activityBar.background", "activityBar.foreground"],
    defaultColor: "#333333"
  },
  {
    id: "sideBar",
    label: "Side Bar",
    description: "Explorer and other sidebar panels",
    colorKeys: ["sideBar.background", "sideBar.foreground"],
    defaultColor: "#252526"
  },
  {
    id: "statusBar",
    label: "Status Bar",
    description: "Bottom status bar",
    colorKeys: ["statusBar.background", "statusBar.foreground"],
    defaultColor: "#007ACC"
  },
  {
    id: "titleBar",
    label: "Title Bar",
    description: "Window title bar",
    colorKeys: ["titleBar.activeBackground", "titleBar.activeForeground"],
    defaultColor: "#3C3C3C"
  },
  {
    id: "tabs",
    label: "Tabs",
    description: "Editor tabs",
    colorKeys: ["tab.activeBackground", "tab.inactiveBackground", "tab.activeForeground", "tab.inactiveForeground"],
    defaultColor: "#1E1E1E"
  },
  {
    id: "terminal",
    label: "Terminal",
    description: "Integrated terminal colors",
    colorKeys: ["terminal.background", "terminal.foreground"],
    defaultColor: "#1E1E1E"
  },
  {
    id: "buttons",
    label: "Buttons",
    description: "Button colors",
    colorKeys: ["button.background", "button.foreground"],
    defaultColor: "#0E639C"
  },
];