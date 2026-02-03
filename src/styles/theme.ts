import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    // Primary
    primary: '#1d9bf0',
    primaryHover: '#1a8cd8',
    primaryLight: 'rgba(29, 155, 240, 0.1)',

    // Backgrounds
    background: '#ffffff',
    backgroundSecondary: '#f7f9f9',
    backgroundHover: 'rgba(0, 0, 0, 0.03)',

    // Text
    text: '#0f1419',
    textSecondary: '#536471',
    textMuted: '#8899a6',

    // Borders
    border: '#eff3f4',
    borderDark: '#cfd9de',

    // Status
    error: '#f4212e',
    errorLight: 'rgba(244, 33, 46, 0.1)',
    success: '#00ba7c',
    successLight: 'rgba(0, 186, 124, 0.1)',
    warning: '#ffd400',
    warningLight: 'rgba(255, 212, 0, 0.1)',

    // Utility
    overlay: 'rgba(91, 112, 131, 0.4)',
    white: '#ffffff',
    black: '#000000',
  },

  space: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },

  radii: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
  },

  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    focus: '0 0 0 3px rgba(29, 155, 240, 0.3)',
  },

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  fonts: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};
