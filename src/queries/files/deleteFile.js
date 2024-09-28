"use server";

import { sql } from "@/database";

export async function deleteFile(fileId) {
  return await sql`DELETE FROM files WHERE id = ${fileId}`;
}
