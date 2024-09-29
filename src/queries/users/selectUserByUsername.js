"use server";
import { sql } from "@/database";

export async function selectUserByUsername(username) {
  return await sql`SELECT * FROM users WHERE username = ${username}`;
}
