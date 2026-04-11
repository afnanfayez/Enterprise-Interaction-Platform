import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  phone: z.string().optional(),
  accountType: z
    .enum(['individual', 'business', 'government', 'distributor', 'agent'])
    .default('individual'),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const createOrderSchema = z.object({
  orderType: z.enum(['retail', 'wholesale', 'government', 'custom']),
  countryIso2: z.string().length(2),
  city: z.string().min(1),
  currency: z.string().min(1),
  description: z.string().optional(),
  quantity: z.number().int().positive().default(1),
  notes: z.string().optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const updateOrderStatusSchema = z.object({
  status: z.enum(['received', 'processing', 'shipped', 'done', 'cancelled']),
  note: z.string().optional(),
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;

export const updateProfileSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
