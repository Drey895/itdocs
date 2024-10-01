"use server";

import { sql } from "@/database";
import { getUser } from "@/user";

export async function deleteUserAction(userId) {
  const user = await getUser();
  if (user && user.role === "admin") {
    try {
      await sql`UPDATE files SET user_id = ${user.id} WHERE user_id = ${userId}`;
      await sql`DELETE FROM users WHERE id = ${userId}`;
    } catch {
      await sql`DELETE FROM files WHERE user_id = ${userId}`;
      await sql`DELETE FROM users WHERE id = ${userId}`;
    }
  }
}
