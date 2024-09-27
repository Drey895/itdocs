import { Button, FilesGrid } from "@/components";
import { selectFiles } from "@/queries/files";
import { getUser } from "@/user";

export async function Documents() {
  const user = await getUser();
  const files = selectFiles(user?.id, 30);
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
