import { fetchFiles } from "@/actions";
import { Button, FilesGrid } from "@/components";

export function Documents() {
  const files = fetchFiles(30);
  return (
    <>
      <title>Документы | IT-Docs</title>
      <div className="flex justify-end p-8">
        <Button className="bg-gray-100 hover:bg-gray-200 rounded-lg">
          Добавить
        </Button>
      </div>
      <FilesGrid init={files} />
    </>
  );
}
