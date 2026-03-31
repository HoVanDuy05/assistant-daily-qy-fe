import { z } from 'zod';

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu không khớp',
  path: ['confirmPassword'],
});

// Command schemas
export const executeCommandSchema = z.object({
  input: z.string().min(1, 'Vui lòng nhập lệnh').max(2000, 'Lệnh quá dài'),
});

// Reminder schemas
export const createReminderSchema = z.object({
  content: z.string().min(1, 'Vui lòng nhập nội dung').max(500, 'Nội dung quá dài'),
  remind_at: z.string().datetime(),
  type: z.enum(['push', 'telegram', 'email']),
});

export const updateReminderSchema = z.object({
  content: z.string().min(1).max(500).optional(),
  remind_at: z.string().datetime().optional(),
  type: z.enum(['push', 'telegram', 'email']).optional(),
  status: z.enum(['pending', 'sent', 'cancelled']).optional(),
});

// Content schemas
export const updateContentSchema = z.object({
  generated_content: z.string().min(1, 'Nội dung không được để trống'),
});

// Social post schemas
export const updateSocialPostSchema = z.object({
  content: z.string().optional(),
  scheduled_at: z.string().datetime().nullable().optional(),
  status: z.enum(['pending', 'scheduled', 'posted', 'failed', 'cancelled']).optional(),
});

// User profile schema
export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  telegram_chat_id: z.string().nullable().optional(),
  social_accounts: z.record(z.string(), z.any()).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ExecuteCommandInput = z.infer<typeof executeCommandSchema>;
export type CreateReminderInput = z.infer<typeof createReminderSchema>;
export type UpdateReminderInput = z.infer<typeof updateReminderSchema>;
export type UpdateContentInput = z.infer<typeof updateContentSchema>;
export type UpdateSocialPostInput = z.infer<typeof updateSocialPostSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
