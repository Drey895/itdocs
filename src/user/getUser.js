"use server";

import { sql } from "@/database";
import { cookies } from "next/headers";

export async function getUser() {
  const store = cookies();
  const user = store.get("user");
  let userValue;
  if (store.has("user") && user.value != "") userValue = JSON.parse(user.value);
  if (userValue) {
    const userRow = (
      await sql`SELECT *, 
      (SELECT COUNT(files.id) FROM files WHERE files.user_id = users.id AND files.group_id IS NULL) files, 
      (SELECT COUNT(files.id) FROM files WHERE files.user_id = users.id AND files.group_id IS NOT NULL) group_files
       FROM users WHERE id = ${userValue.id}`
    )[0];
    if (!userRow) {
      return {};
    }
    return userRow;
  }
  return {};
}
