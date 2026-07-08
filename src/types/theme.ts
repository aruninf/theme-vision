export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  card: string;
  border: string;
  text: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  hover: string;
  disabled: string;
}

export interface ThemeAccessibility {
  score: number;
  wcagAA: boolean;
  wcagAAA: boolean;
  colorBlindFriendly: boolean;
  contrastRating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}

export interface ThemeGradient {
  name: string;
  type: 'solid' | 'linear' | 'radial' | 'animated' | 'mesh' | 'aurora';
  colors: string[];
  angle?: number;
}

export interface Theme {
  id: string;
  name: string;
  slug: string;
  description: string;
  mood: string[];
  industries: string[];
  categories: string[];
  colors: ThemeColors;
  rgb: ThemeColors;
  cssVariables: Record<string, string>;
  gradients: {
    primary: ThemeGradient;
    secondary: ThemeGradient;
    accent: ThemeGradient;
  };
  accessibility: ThemeAccessibility;
  typography: {
    heading: string;
    body: string;
  };
  premium: boolean;
  trending: boolean;
  featured: boolean;
  popularity: number;
}

export interface GradientCollection {
  name: string;
  slug: string;
  description: string;
  type: 'mesh' | 'aurora' | 'sunset' | 'ocean' | 'neon' | 'royal' | 'emerald' | 'purple-dream' | 'midnight' | 'fire' | 'mint' | 'glass';
  colors: string[];
  gradient: string;
  animated: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  count: number;
}

export type ExportFormat =
  | 'css-variables'
  | 'tailwind-config'
  | 'scss-variables'
  | 'flutter-themedata'
  | 'react-native'
  | 'swiftui'
  | 'android-xml'
  | 'material-3'
  | 'json-tokens';
