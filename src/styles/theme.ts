// Color palette - Design System
export const COLORS = {
  // Primary colors
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },

  // Dark theme colors
  dark: {
    900: '#020617',
    800: '#0f172a',
    700: '#1e293b',
    600: '#334155',
    500: '#475569',
    400: '#64748b',
    300: '#94a3b8',
    200: '#cbd5e1',
    100: '#e2e8f0',
    50: '#f1f5f9',
  },

  // Semantic colors
  success: {
    light: '#86efac',
    main: '#22c55e',
    dark: '#16a34a',
    bg: 'rgba(34, 197, 94, 0.2)',
  },
  error: {
    light: '#fca5a5',
    main: '#ef4444',
    dark: '#dc2626',
    bg: 'rgba(239, 68, 68, 0.2)',
  },
  warning: {
    light: '#fcd34d',
    main: '#f59e0b',
    dark: '#d97706',
    bg: 'rgba(245, 158, 11, 0.2)',
  },
  info: {
    light: '#93c5fd',
    main: '#3b82f6',
    dark: '#2563eb',
    bg: 'rgba(59, 130, 246, 0.2)',
  },

  // Text colors
  text: {
    primary: '#ffffff',
    secondary: '#94a3b8',
    disabled: '#64748b',
    hint: '#475569',
  },

  // Background colors
  background: {
    default: '#0f172a',
    paper: '#1e293b',
    elevated: '#334155',
  },

  // Border colors
  border: {
    light: 'rgba(255, 255, 255, 0.1)',
    main: 'rgba(255, 255, 255, 0.2)',
    dark: 'rgba(255, 255, 255, 0.05)',
  },
} as const;

// Spacing system (in px)
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

// Border radius
export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const;

// Typography
export const TYPOGRAPHY = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Breakpoints
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

// Shadows
export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  glow: '0 0 20px rgba(99, 102, 241, 0.3)',
  'glow-lg': '0 0 40px rgba(99, 102, 241, 0.5)',
} as const;

// Transitions
export const TRANSITIONS = {
  fast: '150ms ease-in-out',
  normal: '300ms ease-in-out',
  slow: '500ms ease-in-out',
  spring: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Z-index scale
export const Z_INDEX = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;
