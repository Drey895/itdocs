"use server";

import { sql } from "@/database";

export async function selectFiles(userId, limit, cursor) {
  const query = await sql`SELECT * FROM files WHERE id > ${
    cursor ?? 0
  } AND user_id = ${userId} ORDER BY created_at DESC, id LIMIT ${limit}`;
  console.log(query);
  return query;
}
