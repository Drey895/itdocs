"use server";

import { sql } from "@/database";

export async function filesStat() {
  return (await sql`SELECT COUNT(id) FROM files`)[0].count;
}
