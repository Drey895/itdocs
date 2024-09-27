"use server";

import { insertFile } from "@/queries/files/insertFile";
import { getUser } from "@/user";
import { saveFile } from "./saveFile";

export async function uploadFile(prevState, formData) {
  console.log(formData);
  if (prevState?.data) return null;
  try {
    const user = await getUser();
    const file = {
      user_id: user?.id,
      name: formData.get("name"),
      size: formData.get("size"),
      type: formData.get("type"),
    };
    const blob = formData.get("file");
    if (blob.size > 1000 * 1000 * 50)
      return { error: "Мы не обслуживаем файлы больше 50 MB" };

    const row = await insertFile(file);
    await saveFile(blob, row[0].id);
    return { data: row[0] };
  } catch (error) {
    console.error(error);
  }
}
