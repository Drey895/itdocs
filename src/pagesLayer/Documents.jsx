import { fetchFiles } from "@/actions";
import { Button, FilesGrid } from "@/components";
import { selectFiles } from "@/queries/files";
import { cookies } from "next/headers";

export function Documents() {
  const user = JSON.parse(cookies().get("user").value)[0];
  const files = selectFiles(user.id, 30);
  return (
    <>
      <title>Документы | IT-Docs</title>
      <div className="flex justify-end pt-8 pb-3 px-5">
        <Button className="bg-gray-100 hover:bg-gray-200 rounded-lg">
          Добавить
        </Button>
      </div>
      <FilesGrid init={files} />
    </>
  );
}
