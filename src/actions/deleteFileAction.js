import { selectFileById } from "@/queries/files";
import { deleteFile } from "@/queries/files/deleteFile";
import { getUser } from "@/user";

export async function deleteFileAction(fileId) {
  const user = await getUser();
  const file = (await selectFileById(fileId))[0] ?? null;
  if (user && file && (user.role === "admin" || user.id === file.user_id)) {
    deleteFile(fileId);
  }
}
