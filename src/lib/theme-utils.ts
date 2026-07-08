import { Theme, ExportFormat } from "@/types/theme";

export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "0, 0, 0";
}

export function hexToRgbObject(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 0, g: 0, b: 0 };
}

export function interpolateColor(color1: string, color2: string, factor: number): string {
  const c1 = hexToRgbObject(color1);
  const c2 = hexToRgbObject(color2);
  const r = Math.round(c1.r + (c2.r - c1.r) * factor);
  const g = Math.round(c1.g + (c2.g - c1.g) * factor);
  const b = Math.round(c1.b + (c2.b - c1.b) * factor);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function generateCSSVariables(theme: Theme): string {
  return `:root {\n${Object.entries(theme.cssVariables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n")}\n}`;
}

export function generateTailwindConfig(theme: Theme): string {
  return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        primary: '${theme.colors.primary}',\n        secondary: '${theme.colors.secondary}',\n        accent: '${theme.colors.accent}',\n        background: '${theme.colors.background}',\n        surface: '${theme.colors.surface}',\n        card: '${theme.colors.card}',\n        border: '${theme.colors.border}',\n        text: '${theme.colors.text}',\n        success: '${theme.colors.success}',\n        warning: '${theme.colors.warning}',\n        error: '${theme.colors.error}',\n        info: '${theme.colors.info}',\n      },\n    },\n  },\n};`;
}

export function generateSCSSVariables(theme: Theme): string {
  return Object.entries(theme.cssVariables)
    .map(([key, value]) => `$${key.replace("--", "").replace(/-/g, "-")}: ${value};`)
    .join("\n");
}

export function generateFlutterThemeData(theme: Theme): string {
  return `ThemeData(\n  primaryColor: const Color(0x${theme.colors.primary.slice(1)}),\n  colorScheme: ColorScheme(\n    primary: const Color(0x${theme.colors.primary.slice(1)}),\n    secondary: const Color(0x${theme.colors.secondary.slice(1)}),\n    surface: const Color(0x${theme.colors.surface.slice(1)}),\n    error: const Color(0x${theme.colors.error.slice(1)}),\n  ),\n);`;
}

export function generateReactNativeTheme(theme: Theme): string {
  return `const theme = {\n  colors: {\n    primary: '${theme.colors.primary}',\n    secondary: '${theme.colors.secondary}',\n    accent: '${theme.colors.accent}',\n    background: '${theme.colors.background}',\n    surface: '${theme.colors.surface}',\n    card: '${theme.colors.card}',\n    border: '${theme.colors.border}',\n    text: '${theme.colors.text}',\n    success: '${theme.colors.success}',\n    warning: '${theme.colors.warning}',\n    error: '${theme.colors.error}',\n    info: '${theme.colors.info}',\n  },\n};\n\nexport default theme;`;
}

export function generateSwiftUIColorAssets(theme: Theme): string {
  return `// SwiftUI Color Assets\nimport SwiftUI\n\nextension Color {\n${Object.entries(theme.colors)
    .map(([key, value]) => `  static let ${key} = Color(hex: "${value}")`)
    .join("\n")}\n}`;
}

export function generateAndroidXMLColors(theme: Theme): string {
  return `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n${Object.entries(theme.colors)
    .map(([key, value]) => `  <color name="${key}">${value}</color>`)
    .join("\n")}\n</resources>`;
}

export function generateMaterial3Scheme(theme: Theme): string {
  return `// Material 3 Color Scheme\nval themeColorScheme = lightColorScheme(\n  primary = Color(0xFF${theme.colors.primary.slice(1)}),\n  secondary = Color(0xFF${theme.colors.secondary.slice(1)}),\n  tertiary = Color(0xFF${theme.colors.accent.slice(1)}),\n  background = Color(0xFF${theme.colors.background.slice(1)}),\n  surface = Color(0xFF${theme.colors.surface.slice(1)}),\n  error = Color(0xFF${theme.colors.error.slice(1)}),\n)`;
}

export function generateJSONDesignTokens(theme: Theme): string {
  return JSON.stringify(
    {
      theme: {
        name: theme.name,
        slug: theme.slug,
        colors: theme.colors,
        cssVariables: theme.cssVariables,
        typography: theme.typography,
        accessibility: theme.accessibility,
      },
    },
    null,
    2
  );
}

export function generateExport(theme: Theme, format: ExportFormat): string {
  const generators: Record<ExportFormat, () => string> = {
    "css-variables": () => generateCSSVariables(theme),
    "tailwind-config": () => generateTailwindConfig(theme),
    "scss-variables": () => generateSCSSVariables(theme),
    "flutter-themedata": () => generateFlutterThemeData(theme),
    "react-native": () => generateReactNativeTheme(theme),
    swiftui: () => generateSwiftUIColorAssets(theme),
    "android-xml": () => generateAndroidXMLColors(theme),
    "material-3": () => generateMaterial3Scheme(theme),
    "json-tokens": () => generateJSONDesignTokens(theme),
  };
  return generators[format]();
}

export function getExportLabel(format: ExportFormat): string {
  const labels: Record<ExportFormat, string> = {
    "css-variables": "CSS Variables",
    "tailwind-config": "Tailwind Config",
    "scss-variables": "SCSS Variables",
    "flutter-themedata": "Flutter ThemeData",
    "react-native": "React Native Theme",
    swiftui: "SwiftUI Colors",
    "android-xml": "Android XML",
    "material-3": "Material 3",
    "json-tokens": "JSON Tokens",
  };
  return labels[format];
}
