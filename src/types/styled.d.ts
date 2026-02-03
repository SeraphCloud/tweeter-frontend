import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryHover: string;
      primaryLight: string;
      background: string;
      backgroundSecondary: string;
      backgroundHover: string;
      text: string;
      textSecondary: string;
      textMuted: string;
      border: string;
      borderDark: string;
      error: string;
      errorLight: string;
      success: string;
      successLight: string;
      warning: string;
      warningLight: string;
      overlay: string;
      white: string;
      black: string;
    };
    space: {
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      8: string;
      10: string;
      12: string;
      16: string;
      20: string;
      24: string;
    };
    radii: {
      none: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      full: string;
    };
    shadows: {
      none: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      inner: string;
      focus: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
    fontWeights: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeights: {
      none: number;
      tight: number;
      snug: number;
      normal: number;
      relaxed: number;
      loose: number;
    };
    fonts: {
      sans: string;
      mono: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
