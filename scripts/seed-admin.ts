import { eq } from 'drizzle-orm';
import { hash } from 'bcryptjs';
import { users } from '../lib/server/schema';

const ADMIN_EMAIL = 'admin@adel.com';
const ADMIN_PASSWORD = 'Admin123!';
const ADMIN_NAME = 'Admin';

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL environment variable is not set.');
    process.exit(1);
  }

  // Use Neon for remote, pg for local
  let db: ReturnType<typeof import('drizzle-orm/neon-http').drizzle> | ReturnType<typeof import('drizzle-orm/node-postgres').drizzle>;
  if (databaseUrl.includes('neon.tech') || databaseUrl.includes('sslmode=require')) {
    const { neon } = await import('@neondatabase/serverless');
    const { drizzle } = await import('drizzle-orm/neon-http');
    db = drizzle(neon(databaseUrl));
  } else {
    const { default: pg } = await import('pg');
    const { drizzle } = await import('drizzle-orm/node-postgres');
    db = drizzle(new pg.Pool({ connectionString: databaseUrl }));
  }

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, ADMIN_EMAIL))
    .limit(1);

  if (existing) {
    console.log(`⏭️  Admin user (${ADMIN_EMAIL}) already exists — skipped.`);
    process.exit(0);
  }

  const passwordHash = await hash(ADMIN_PASSWORD, 12);

  await db.insert(users).values({
    email: ADMIN_EMAIL,
    passwordHash,
    name: ADMIN_NAME,
    role: 'admin',
    accountType: 'individual',
  });

  console.log(`✅ Admin user created: ${ADMIN_EMAIL}`);
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
