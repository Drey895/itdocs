"use server";

import fs from "fs/promises";
import path from "path";

export async function saveFile(file, fileId) {
  const dirPath = path.join("files", file.type);
  await fs.mkdir(dirPath, { recursive: true });
  const filePath = path.join(dirPath, String(fileId));
  await fs.writeFile(filePath, new Uint8Array(await file.arrayBuffer()));
}
