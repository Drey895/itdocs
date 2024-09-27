"use server";

import { sql } from "@/database";

export async function insertFile(file) {
  const query = await sql`insert into files ${sql(
    file,
    "user_id",
    "name",
    "type",
    "size"
  )} returning *`;
  console.log(query);
  return query;
}
