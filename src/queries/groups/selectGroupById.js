"use server";

import { sql } from "@/database";

export async function selectGroupById(groupId) {
  return (await sql`SELECT * FROM groups WHERE id = ${groupId}`)[0];
}
