"use server";

import { sql } from "@/database";

export async function groupsMonthStat() {
  return (
    await sql`SELECT COUNT(id) FROM groups WHERE created_at > (NOW() - INTERVAL '1 month')`
  )[0].count;
}
