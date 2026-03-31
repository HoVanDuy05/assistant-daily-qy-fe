// API Constants
export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      ME: '/auth/me',
      PROFILE: '/auth/profile',
    },
    COMMANDS: {
      EXECUTE: '/commands/execute',
      HISTORY: '/commands/history',
      GET: (id: number) => `/commands/${id}`,
    },
    REMINDERS: {
      LIST: '/reminders',
      CREATE: '/reminders',
      UPDATE: (id: number) => `/reminders/${id}`,
      DELETE: (id: number) => `/reminders/${id}`,
    },
    CONTENTS: {
      LIST: '/contents',
      GET: (id: number) => `/contents/${id}`,
      UPDATE: (id: number) => `/contents/${id}`,
      DELETE: (id: number) => `/contents/${id}`,
    },
    SOCIAL_POSTS: {
      LIST: '/social-posts',
      GET: (id: number) => `/social-posts/${id}`,
      UPDATE: (id: number) => `/social-posts/${id}`,
      DELETE: (id: number) => `/social-posts/${id}`,
    },
  },
} as const;

// App Constants
export const APP = {
  NAME: 'QY Smart Assistant',
  SHORT_NAME: 'QY Assistant',
  VERSION: '1.0.0',
  DESCRIPTION: 'AI-powered smart assistant - Tối giản hóa mọi thao tác qua một dòng input',
  AUTHOR: 'QY Team',
  LANG: 'vi',
  THEME_COLOR: '#6366f1',
  BACKGROUND_COLOR: '#0f172a',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  SETTINGS: 'settings',
  THEME: 'theme',
  LANGUAGE: 'language',
  ONBOARDING_COMPLETE: 'onboarding_complete',
} as const;

// Validation Constants
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  CONTENT_MAX_LENGTH: 500,
  COMMAND_MAX_LENGTH: 2000,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// Time Constants (in milliseconds)
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const;

// Action Types
export const ACTION_TYPES = {
  CREATE_REMINDER: 'create_reminder',
  GENERATE_CONTENT: 'generate_content',
  SCHEDULE_POST: 'schedule_post',
  REFINE_CONTENT: 'refine_content',
} as const;

// Reminder Types
export const REMINDER_TYPES = {
  PUSH: 'push',
  TELEGRAM: 'telegram',
  EMAIL: 'email',
} as const;

// Social Platforms
export const SOCIAL_PLATFORMS = {
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  LINKEDIN: 'linkedin',
} as const;

// Content Tones
export const CONTENT_TONES = {
  PROFESSIONAL: 'professional',
  FRIENDLY: 'friendly',
  CASUAL: 'casual',
  PERSUASIVE: 'persuasive',
} as const;

// Status
export const STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  SCHEDULED: 'scheduled',
  POSTED: 'posted',
  CANCELLED: 'cancelled',
  SENT: 'sent',
} as const;

// Animation Durations (in seconds)
export const ANIMATION_DURATION = {
  FAST: 0.15,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 0.8,
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  REMINDERS: '/reminders',
  HISTORY: '/history',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;
