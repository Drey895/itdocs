"use server";

import { sql } from "@/database";

export async function filesMonthStat() {
  return (
    await sql`SELECT COUNT(id) FROM files WHERE created_at > (NOW() - INTERVAL '1 month')`
  )[0].count;
}
