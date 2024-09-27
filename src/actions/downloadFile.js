"use server";

import { selectFileById } from "@/queries/files";
import { selectUser } from "@/queries/users";
import fs from "fs/promises";
import path from "path";

export async function downloadFile(fileId, userId) {
  const user = (await selectUser(userId))[0] ?? null;
  const file = selectFileById(fileId);

  if (
    user &&
    (user.role === "admin" ||
      user.id === file.user_id ||
      file.group_id !== null)
  ) {
    const filePath = path.join("files", String(userId), String(fileId));
    const fileData = await fs.readFile(filePath);
    const base64String = fileData.toString("base64");
    return base64String;
  }
}
