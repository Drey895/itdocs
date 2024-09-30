"use server";

import { sql } from "@/database";
import { selectFileById } from "@/queries/files";
import { selectUser } from "@/queries/users";
import fs from "fs/promises";
import path from "path";

export async function downloadFile(fileId, userId) {
  const user = (await selectUser(userId))[0] ?? null;
  const file = (await selectFileById(fileId))[0] ?? null;

  if (
    user &&
    file &&
    (user.role === "admin" ||
      user.id === file.user_id ||
      file.group_id !== null)
  ) {
    const query =
      await sql`UPDATE files SET download_count = download_count + 1 WHERE id = ${fileId}`;
    const filePath = path.join("files", file.type, String(fileId));
    const fileData = await fs.readFile(filePath);
    const base64String = fileData.toString("base64");
    return base64String;
  }
}
