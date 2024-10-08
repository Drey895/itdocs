"use server";

import { sql } from "@/database";

export async function selectFilesByUser(userId, limit, cursor) {
  const cursorQuery = (c) => sql`AND id < ${c}`;
  const query =
    await sql`SELECT * FROM files WHERE user_id = ${userId} AND group_id IS NULL ${
      cursor ? cursorQuery(cursor) : sql``
    } ORDER BY created_at DESC, id DESC LIMIT ${limit}`;
  return query;
}
