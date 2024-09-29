"use server";

import { sql } from "@/database";

export async function selectFileById(fileId) {
  return await sql`SELECT * FROM files WHERE id = ${fileId}`;
}
