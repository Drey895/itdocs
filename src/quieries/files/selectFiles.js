"use server";

import { sql } from "@/database";

export async function selectFiles(userId, cursor, limit) {
  const query =
    await sql`SELECT * FROM files WHERE id > ${cursor} AND user_id = ${userId} ORDER BY created_at DESC, id LIMIT ${limit}`;
  console.log(query);
  return query;
}
