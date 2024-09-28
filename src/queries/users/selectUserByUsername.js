"use server";
import { sql } from "@/database";

export async function selectUserByUsername(username) {
  const query = await sql`SELECT * FROM users WHERE username = ${username}`;
  console.log(query);
  return query;
}
