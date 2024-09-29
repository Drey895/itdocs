"use server";
import { sql } from "@/database";

export async function insertUser(user) {
  return await sql`insert into users ${sql(
    user,
    "username",
    "password",
    "role"
  )} returning *`;
}
