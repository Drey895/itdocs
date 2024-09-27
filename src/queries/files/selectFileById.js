"use server";

import { sql } from "@/database";

export async function selectFileById(fileId) {
  const query = await sql`SELECT * FROM files WHERE id = ${fileId}`;
  console.log(query);
  return query;
}
