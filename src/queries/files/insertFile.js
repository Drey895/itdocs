"use server";

import { sql } from "@/database";

export async function insertFile(file) {
  return await sql`insert into files ${sql(
    file,
    "user_id",
    "group_id",
    "name",
    "type",
    "size"
  )} returning *`;
}
