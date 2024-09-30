"use server";

import { sql } from "@/database";

export async function groupsStat() {
  return (await sql`SELECT COUNT(id) FROM groups`)[0].count;
}
