import 'server-only';

import * as schema from './schema';

function createDb() {
  const url = process.env.DATABASE_URL!;

  // Use Neon HTTP driver for serverless/remote, pg for local
  if (url.includes('neon.tech') || url.includes('neon.') || url.includes('sslmode=require')) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { neon } = require('@neondatabase/serverless');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { drizzle } = require('drizzle-orm/neon-http');
    return drizzle(neon(url), { schema });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Pool } = require('pg');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { drizzle } = require('drizzle-orm/node-postgres');
    return drizzle(new Pool({ connectionString: url }), { schema });
  }
}

export const db = createDb();
