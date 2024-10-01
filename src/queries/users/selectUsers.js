import { sql } from "@/database";

export async function selectUsers(limit, cursor) {
  const cursorQuery = (c) => sql`WHERE id < ${c}`;
  const query = await sql`
  SELECT *, 
       (SELECT COUNT(files.id) FROM files WHERE files.user_id = users.id AND files.group_id IS NULL) files, 
       (SELECT COUNT(files.id) FROM files WHERE files.user_id = users.id AND files.group_id IS NOT NULL) group_files 
  FROM users
  ${
    cursor ? cursorQuery(cursor) : sql``
  }  ORDER BY users.created_at DESC, users.id DESC LIMIT ${limit}`;
  return query;
}
