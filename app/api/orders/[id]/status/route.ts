import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/auth';
import { updateOrderStatus } from '@/lib/server/orders';
import { updateOrderStatusSchema } from '@/lib/validators';

export const runtime = 'nodejs';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAdmin(request);
    const { id } = await params;
    const body = await request.json();
    const parsed = updateOrderStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 },
      );
    }

    const updatedOrder = await updateOrderStatus(
      id,
      parsed.data.status,
      user.userId,
      parsed.data.note,
    );

    return NextResponse.json({ data: updatedOrder });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    if (message === 'Unauthorized') {
      return NextResponse.json({ error: message }, { status: 401 });
    }
    if (message === 'Forbidden') {
      return NextResponse.json({ error: message }, { status: 403 });
    }
    if (message.startsWith('Order not found')) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
