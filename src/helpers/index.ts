import { STORAGE_KEYS } from '@/constants';

// Local Storage helpers
export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  },
};

// Token helpers
export const tokenHelper = {
  get: (): string | null => {
    return storage.get<string>(STORAGE_KEYS.TOKEN);
  },

  set: (token: string): void => {
    storage.set(STORAGE_KEYS.TOKEN, token);
  },

  remove: (): void => {
    storage.remove(STORAGE_KEYS.TOKEN);
  },

  isValid: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },
};

// Date/Time helpers
export const dateHelper = {
  format: (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
    const d = new Date(date);
    return d.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      ...options,
    });
  },

  isToday: (date: string | Date): boolean => {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  },

  isPast: (date: string | Date): boolean => {
    return new Date(date) < new Date();
  },

  addMinutes: (date: string | Date, minutes: number): Date => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() + minutes);
    return d;
  },

  addHours: (date: string | Date, hours: number): Date => {
    const d = new Date(date);
    d.setHours(d.getHours() + hours);
    return d;
  },

  addDays: (date: string | Date, days: number): Date => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  },
};

// String helpers
export const stringHelper = {
  truncate: (str: string, length: number, suffix = '...'): string => {
    if (str.length <= length) return str;
    return str.substring(0, length) + suffix;
  },

  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  slugify: (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  },

  randomId: (length = 8): string => {
    return Math.random().toString(36).substring(2, length + 2);
  },
};

// Number helpers
export const numberHelper = {
  format: (num: number, decimals = 0): string => {
    return num.toLocaleString('vi-VN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  },

  formatCompact: (num: number): string => {
    return Intl.NumberFormat('vi-VN', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(num);
  },

  clamp: (num: number, min: number, max: number): number => {
    return Math.min(Math.max(num, min), max);
  },
};

// Object helpers
export const objectHelper = {
  isEmpty: (obj: Record<string, unknown>): boolean => {
    return Object.keys(obj).length === 0;
  },

  pick: <T extends Record<string, unknown>, K extends keyof T>(
    obj: T,
    keys: K[]
  ): Pick<T, K> => {
    const result = {} as Pick<T, K>;
    keys.forEach((key) => {
      if (key in obj) {
        result[key] = obj[key];
      }
    });
    return result;
  },

  omit: <T extends Record<string, unknown>, K extends keyof T>(
    obj: T,
    keys: K[]
  ): Omit<T, K> => {
    const result = { ...obj };
    keys.forEach((key) => {
      delete result[key];
    });
    return result;
  },
};

// Array helpers
export const arrayHelper = {
  groupBy: <T>(array: T[], key: keyof T): Record<string, T[]> => {
    return array.reduce((result, item) => {
      const groupKey = String(item[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, {} as Record<string, T[]>);
  },

  unique: <T>(array: T[], key?: keyof T): T[] => {
    if (key) {
      const seen = new Set();
      return array.filter((item) => {
        const val = item[key];
        if (seen.has(val)) return false;
        seen.add(val);
        return true;
      });
    }
    return [...new Set(array)];
  },

  shuffle: <T>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  },

  chunk: <T>(array: T[], size: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  },
};

// URL helpers
export const urlHelper = {
  buildQuery: (params: Record<string, unknown>): string => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, String(value));
      }
    });
    return query.toString();
  },

  parseQuery: (search: string): Record<string, string> => {
    const params = new URLSearchParams(search);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  },
};
