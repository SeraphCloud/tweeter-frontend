import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Reset leve */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Tipografia base */
  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    line-height: ${({ theme }) => theme.lineHeights.normal};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 100vh;
  }

  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: ${({ theme }) => theme.lineHeights.tight};
    color: ${({ theme }) => theme.colors.text};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  h5 {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }

  h6 {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  /* Parágrafos */
  p {
    margin-bottom: ${({ theme }) => theme.space[4]};
  }

  /* Links */
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
      text-decoration: underline;
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
      border-radius: ${({ theme }) => theme.radii.sm};
    }
  }

  /* Inputs e Textareas */
  input,
  textarea {
    font-family: inherit;
    font-size: inherit;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.borderDark};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[4]};
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: ${({ theme }) => theme.shadows.focus};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.backgroundSecondary};
      color: ${({ theme }) => theme.colors.textMuted};
      cursor: not-allowed;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  /* Buttons */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
      border-radius: ${({ theme }) => theme.radii.sm};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  /* Lists */
  ul,
  ol {
    list-style: none;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Selection */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderDark};
    border-radius: ${({ theme }) => theme.radii.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textMuted};
  }
`;
