"use server";

import { selectFileById } from "@/queries/files";
import { deleteFile } from "@/queries/files/deleteFile";
import { getUser } from "@/user";
import path from "path";
import fs from "fs/promises";

export async function deleteFileAction(fileId) {
  const user = await getUser();
  const file = (await selectFileById(fileId))[0] ?? null;
  if (user && file && (user.role === "admin" || user.id === file.user_id)) {
    const filePath = path.join("files", file.type, String(fileId));
    await deleteFile(fileId);
    await fs.rm(filePath);
  }
}
