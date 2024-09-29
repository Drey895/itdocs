"use server";
import { sql } from "@/database";

export async function selectUser(id) {
  return await sql`SELECT * FROM users WHERE id = ${id}`;
}
