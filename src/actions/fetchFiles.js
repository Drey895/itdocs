"use server";
import { selectFiles } from "@/queries/files";
import { cookies } from "next/headers";

export async function fetchFiles(limit, cursor) {
  const user = JSON.parse(cookies().get("user").value)[0];
  return await selectFiles(user.id, limit, cursor);
}
