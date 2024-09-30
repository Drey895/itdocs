"use server";

import { insertGroup } from "@/queries/groups/insertGroup";
import { getUser } from "@/user";

export async function addGroupAction(prevState, formData) {
  if (prevState?.data) return null;
  try {
    const user = await getUser();
    const group = {
      name: formData.get("name"),
    };
    const row = await insertGroup(group);
    return { data: row[0] };
  } catch (error) {
    console.error(error);
  }
}
