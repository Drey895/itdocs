"use server";

import { sql } from "@/database";

export async function selectFiles(userId, limit, cursor) {
  const cursorQuery = (c) => sql`AND id < ${c}`;
  const query = await sql`SELECT * FROM files WHERE user_id = ${userId} ${
    cursor ? cursorQuery(cursor) : sql``
  } ORDER BY created_at DESC, id DESC LIMIT ${limit}`;
  console.log(query);
  return query;
}
