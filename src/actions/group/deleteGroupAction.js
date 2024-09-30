"use server";

import { sql } from "@/database";
import { getUser } from "@/user";

export async function deleteGroupAction(groupId) {
  const user = await getUser();
  if (user && user.role === "admin") {
    const query =
      await sql`UPDATE files SET group_id = DEFAULT WHERE group_id = ${groupId}
    `;
    const deleteQuery = await sql`DELETE FROM groups WHERE id = ${groupId}`;
  }
}
