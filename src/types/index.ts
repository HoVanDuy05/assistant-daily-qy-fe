// =======================
// ENUMS
// =======================

export enum SocialPlatform {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  LINKEDIN = 'linkedin',
}

export enum CommandType {
  CREATE_REMINDER = 'create_reminder',
  GENERATE_CONTENT = 'generate_content',
  SCHEDULE_POST = 'schedule_post',
  REFINE_CONTENT = 'refine_content',
  ERROR = 'error',
}

export enum CommandStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum ReminderType {
  PUSH = 'push',
  TELEGRAM = 'telegram',
  EMAIL = 'email',
}

export enum ReminderStatus {
  PENDING = 'pending',
  SENT = 'sent',
  CANCELLED = 'cancelled',
}

export enum ContentTone {
  PROFESSIONAL = 'professional',
  FRIENDLY = 'friendly',
  CASUAL = 'casual',
  PERSUASIVE = 'persuasive',
}

export enum PostStatus {
  PENDING = 'pending',
  SCHEDULED = 'scheduled',
  POSTED = 'posted',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

// =======================
// INTERFACES
// =======================

export interface User {
  id: number;
  name: string;
  email: string;
  telegram_chat_id?: string;
  social_accounts?: {
    facebook?: {
      page_id: string;
      access_token: string;
    };
    instagram?: {
      account_id: string;
      access_token: string;
    };
    linkedin?: {
      person_id: string;
      access_token: string;
    };
  };
  created_at: string;
  updated_at: string;
}

export interface Command {
  id: number;
  user_id: number;
  raw_input: string;
  parsed_actions: ParsedAction[];
  status: CommandStatus;
  results: CommandResult[];
  executed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ParsedAction {
  type: CommandType;
  params: Record<string, unknown>;
}

export interface CommandResult {
  action: CommandType;
  result: {
    status: 'success' | 'error';
    [key: string]: unknown;
  };
}

export interface Reminder {
  id: number;
  user_id: number;
  content: string;
  remind_at: string;
  type: ReminderType;
  status: ReminderStatus;
  created_at: string;
  updated_at: string;
}

export interface Content {
  id: number;
  user_id: number;
  command_id?: number;
  topic: string;
  generated_content: string;
  tone: ContentTone;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface SocialPost {
  id: number;
  user_id: number;
  content_id?: number;
  platform: SocialPlatform;
  content: string;
  media_url?: string;
  scheduled_at?: string;
  posted_at?: string;
  status: PostStatus;
  external_post_id?: string;
  response_data?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}