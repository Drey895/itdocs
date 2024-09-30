"use server";

import { sql } from "@/database";

export async function selectFilesByGroup(groupId, limit, cursor) {
  const cursorQuery = (c) => sql`AND id < ${c}`;
  const query = await sql`SELECT * FROM files WHERE group_id = ${groupId} ${
    cursor ? cursorQuery(cursor) : sql``
  } ORDER BY created_at DESC, id DESC LIMIT ${limit}`;
  return query;
}
