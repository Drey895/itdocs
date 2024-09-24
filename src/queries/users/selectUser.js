"use server";
import { sql } from "@/database";

export async function selectUser(username) {
  const query = await sql`SELECT * FROM users WHERE username = ${username}`;
  console.log(query);
  return query;
}
