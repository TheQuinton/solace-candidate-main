import db from "../../../db";
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function POST() {
  const records = await (db as PostgresJsDatabase).insert(advocates).values(advocateData).returning();

  return Response.json({ advocates: records });
}
