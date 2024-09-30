"use server";

import { sql } from "@/database";

export async function insertGroup(group) {
  return await sql`insert into groups ${sql(group, "name")} returning *`;
}
