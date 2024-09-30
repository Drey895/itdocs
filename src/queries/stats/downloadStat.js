"use server";

import { sql } from "@/database";

export async function downloadStat() {
  return (await sql`SELECT SUM(download_count) FROM files`)[0].sum;
}
