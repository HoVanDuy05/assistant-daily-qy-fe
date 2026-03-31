import { SxProps, Theme } from '@mui/material/styles';
import { COLORS, BORDER_RADIUS, SHADOWS, TRANSITIONS } from '@/styles/theme';

// Common MUI sx props for reusability
export const commonStyles = {
  // Card styles
  card: {
    background: `linear-gradient(135deg, ${COLORS.dark[700]}CC, ${COLORS.dark[800]}CC)`,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${COLORS.border.light}`,
    borderRadius: BORDER_RADIUS.xxl,
    boxShadow: SHADOWS.none,
  } as SxProps<Theme>,

  // Input styles
  input: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: `${COLORS.dark[900]}99`,
      borderRadius: BORDER_RADIUS.xl,
      color: COLORS.text.primary,
      transition: `all ${TRANSITIONS.normal}`,
      '& fieldset': {
        borderColor: COLORS.border.light,
        borderWidth: '2px',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(99, 102, 241, 0.3)',
      },
      '&.Mui-focused fieldset': {
        borderColor: COLORS.primary[500],
        boxShadow: SHADOWS.glow,
      },
    },
    '& .MuiInputLabel-root': {
      color: COLORS.text.secondary,
    },
  } as SxProps<Theme>,

  // Button styles
  buttonPrimary: {
    background: `linear-gradient(135deg, ${COLORS.primary[600]}, ${COLORS.primary[700]})`,
    color: COLORS.text.primary,
    borderRadius: BORDER_RADIUS.xl,
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: `${SHADOWS.glow}`,
    transition: `all ${TRANSITIONS.normal}`,
    '&:hover': {
      background: `linear-gradient(135deg, ${COLORS.primary[500]}, ${COLORS.primary[600]})`,
      boxShadow: SHADOWS['glow-lg'],
    },
  } as SxProps<Theme>,

  buttonOutlined: {
    borderColor: COLORS.border.main,
    color: COLORS.text.secondary,
    borderRadius: BORDER_RADIUS.xl,
    fontWeight: 600,
    textTransform: 'none',
    transition: `all ${TRANSITIONS.normal}`,
    '&:hover': {
      borderColor: COLORS.primary[500],
      color: COLORS.primary[400],
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
    },
  } as SxProps<Theme>,

  // Chip styles
  chip: {
    backgroundColor: `${COLORS.dark[600]}80`,
    color: COLORS.text.secondary,
    borderRadius: BORDER_RADIUS.full,
    transition: `all ${TRANSITIONS.normal}`,
    '&:hover': {
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      color: COLORS.primary[300],
    },
  } as SxProps<Theme>,

  // Gradient backgrounds
  gradientPrimary: {
    background: `linear-gradient(135deg, ${COLORS.primary[500]}20, ${COLORS.primary[700]}20)`,
  } as SxProps<Theme>,

  gradientSuccess: {
    background: `linear-gradient(135deg, ${COLORS.success.light}20, ${COLORS.success.main}20)`,
  } as SxProps<Theme>,

  gradientError: {
    background: `linear-gradient(135deg, ${COLORS.error.light}20, ${COLORS.error.main}20)`,
  } as SxProps<Theme>,

  // Status colors
  statusSuccess: {
    backgroundColor: COLORS.success.bg,
    color: COLORS.success.main,
    borderColor: `${COLORS.success.main}30`,
  } as SxProps<Theme>,

  statusError: {
    backgroundColor: COLORS.error.bg,
    color: COLORS.error.main,
    borderColor: `${COLORS.error.main}30`,
  } as SxProps<Theme>,

  statusWarning: {
    backgroundColor: COLORS.warning.bg,
    color: COLORS.warning.main,
    borderColor: `${COLORS.warning.main}30`,
  } as SxProps<Theme>,

  statusInfo: {
    backgroundColor: COLORS.info.bg,
    color: COLORS.info.main,
    borderColor: `${COLORS.info.main}30`,
  } as SxProps<Theme>,
} as const;

// Tailwind class combinations
export const commonClasses = {
  // Layout
  container: 'min-h-screen bg-gradient-to-b from-slate-900 to-black',
  pageContainer: 'py-8 px-4 md:px-8',

  // Cards
  card: 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl',
  cardHover: 'hover:bg-slate-700/50 transition-all duration-300',

  // Inputs
  input: 'bg-slate-900/60 rounded-2xl border-2 border-white/10 focus:border-primary-500 focus:shadow-glow transition-all',

  // Buttons
  btnPrimary: 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 transition-all',
  btnOutlined: 'border border-slate-600 text-gray-300 hover:border-primary-500 hover:text-primary-400 transition-all',

  // Text
  textPrimary: 'text-white',
  textSecondary: 'text-gray-400',
  textMuted: 'text-gray-500',

  // Status badges
  badgeSuccess: 'bg-green-500/20 text-green-400 border border-green-500/30',
  badgeError: 'bg-red-500/20 text-red-400 border border-red-500/30',
  badgeWarning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  badgeInfo: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
} as const;
