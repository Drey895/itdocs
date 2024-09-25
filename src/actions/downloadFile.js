"use server";

import fs from "fs/promises";
import path from "path";

export async function downloadFile(fileId, userId) {
  const filePath = path.join("files", String(userId), String(fileId));
  const fileData = await fs.readFile(filePath);
  const base64String = fileData.toString("base64");
  return base64String;
}
