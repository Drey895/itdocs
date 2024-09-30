"use server";

import { sql } from "@/database";

export async function selectGroups(limit, cursor) {
  const cursorQuery = (c) => sql`WHERE id < ${c}`;
  const query =
    await sql`SELECT *, (SELECT COUNT(files.group_id) FROM files WHERE files.group_id = groups.id) FROM groups ${
      cursor ? cursorQuery(cursor) : sql``
    } ORDER BY created_at DESC, id DESC LIMIT ${limit}`;
  return query;
}
