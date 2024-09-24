"use server";
import { sql } from "@/database";

export async function insertUser(user) {
  const query = await sql`insert into users ${sql(
    user,
    "username",
    "password",
    "role"
  )} returning *`;
  console.log(query);
  return query;
}
