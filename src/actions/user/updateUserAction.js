"use server";

import { sql } from "@/database";
import { getUser } from "@/user";

export async function updateUserAction(formData) {
  const user = await getUser();
  console.log(formData);

  if (user && user.role === "admin") {
    const query = await sql`UPDATE users SET username = ${formData.get(
      "username"
    )}, password = ${formData.get("password")}, role = ${
      formData.get("role") ? "admin" : "user"
    } WHERE id = ${formData.get("id")}`;
  }
}
