"use server";
import { sql } from "@/database";

export async function selectUser(id) {
  const query = await sql`SELECT * FROM users WHERE id = ${id}`;
  console.log(query);
  return query;
}
