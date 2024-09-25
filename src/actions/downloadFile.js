"use server";

import fs from "fs/promises";
import path from "path";

export async function downloadFile(fileId) {
  const filePath = path.join("public", `${fileId}`);
  const fileData = await fs.readFile(filePath);
  const base64String = fileData.toString("base64");
  return base64String;
}
