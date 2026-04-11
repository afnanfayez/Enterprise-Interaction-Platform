import 'server-only';

import { eq, desc, asc } from 'drizzle-orm';
import { db } from './db';
import {
  orders,
  orderStatusHistory,
  type Order,
  type OrderStatusHistory,
} from './schema';

// ── Types ────────────────────────────────────────────────────────────────────

export interface CreateOrderInput {
  userId: string;
  orderType: string;
  countryIso2: string;
  city: string;
  currency: string;
  description?: string;
  quantity?: number;
  notes?: string;
}

export interface OrderWithHistory extends Order {
  statusHistory: OrderStatusHistory[];
}

// Re-export schema types for convenience
export type { Order, OrderStatusHistory };

// ── Helpers ──────────────────────────────────────────────────────────────────

export function generateOrderNumber(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `ADL-${yyyy}${mm}${dd}-${rand}`;
}

// ── Data-access functions ────────────────────────────────────────────────────

export async function createOrder(data: CreateOrderInput): Promise<Order> {
  const orderNumber = generateOrderNumber();

  const [created] = await db
    .insert(orders)
    .values({
      orderNumber,
      userId: data.userId,
      orderType: data.orderType,
      countryIso2: data.countryIso2,
      city: data.city,
      currency: data.currency,
      description: data.description,
      quantity: data.quantity,
      notes: data.notes,
    })
    .returning();

  await db.insert(orderStatusHistory).values({
    orderId: created.id,
    status: 'received',
    changedBy: data.userId,
  });

  return created;
}

export async function getOrderById(
  orderId: string,
): Promise<OrderWithHistory | null> {
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
  });

  if (!order) return null;

  const history = await db
    .select()
    .from(orderStatusHistory)
    .where(eq(orderStatusHistory.orderId, orderId))
    .orderBy(asc(orderStatusHistory.createdAt));

  return { ...order, statusHistory: history };
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  return db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));
}

export async function getAllOrders(
  filters?: { status?: string },
): Promise<Order[]> {
  const query = db.select().from(orders);

  if (filters?.status) {
    return query
      .where(eq(orders.status, filters.status))
      .orderBy(desc(orders.createdAt));
  }

  return query.orderBy(desc(orders.createdAt));
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: string,
  changedBy: string,
  note?: string,
): Promise<Order> {
  const [updated] = await db
    .update(orders)
    .set({ status: newStatus, updatedAt: new Date() })
    .where(eq(orders.id, orderId))
    .returning();

  if (!updated) {
    throw new Error(`Order not found: ${orderId}`);
  }

  await db.insert(orderStatusHistory).values({
    orderId,
    status: newStatus,
    changedBy,
    note,
  });

  return updated;
}
