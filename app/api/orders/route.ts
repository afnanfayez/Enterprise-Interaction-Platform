import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/server/auth';
import {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
} from '@/lib/server/orders';
import { createOrderSchema } from '@/lib/validators';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const user = await requireAuth(request);

    const orders =
      user.role === 'admin'
        ? await getAllOrders()
        : await getOrdersByUserId(user.userId);

    return NextResponse.json({ data: orders });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    if (message === 'Unauthorized') {
      return NextResponse.json({ error: message }, { status: 401 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();
    const parsed = createOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request data', fields: parsed.error.issues.map(i => i.path[0]) },
        { status: 400 },
      );
    }

    const order = await createOrder({ ...parsed.data, userId: user.userId });

    return NextResponse.json({ data: order }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    if (message === 'Unauthorized') {
      return NextResponse.json({ error: message }, { status: 401 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
