"use server";

import { sql } from "@/database";
import { getUser } from "@/user";

export async function editGroupAction(formData) {
  try {
    const user = await getUser();
    if (user.role !== "admin") return;
    const group = {
      name: formData.get("name"),
    };

    const query = await sql`UPDATE groups SET name = ${formData.get(
      "name"
    )} WHERE id = ${formData.get("id")}`;

    return { data: query[0] };
  } catch (error) {
    console.error(error);
  }
}
