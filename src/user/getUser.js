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
      await sql`SELECT * FROM users WHERE id = ${userValue.id}`
    )[0];
    if (!userRow) {
      return {};
    }
    return userRow;
  }
  return {};
}
