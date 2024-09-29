"use server";

import { sql } from "@/database";
import { selectFileById } from "@/queries/files";
import { getUser } from "@/user";

export async function updateFile(formData) {
  const user = await getUser();
  const file = (await selectFileById(formData.get("id")))[0];

  if (user && file && (user.role === "admin" || user.id === file.user_id)) {
    const query = await sql`UPDATE files SET name = ${formData.get(
      "name"
    )}, type = ${formData.get("type")}, size = ${formData.get(
      "size"
    )} WHERE id = ${formData.get("id")}`;
  }
}
