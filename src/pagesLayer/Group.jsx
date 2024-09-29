import { AddFile, EditFile, FilesGrid } from "@/components";
import { ExtraProvider } from "@/ExtraContext";

export async function Group({ groupId }) {
  const user = await getUser();
  const group = selectGroupById(groupId);
  const files = selectFilesByGroup(groupId, 30);
  return (
    <ExtraProvider user={user}>
      <title>Документы | Группа {group.name} | IT-Docs</title>
      <div className="hidden sm:flex justify-end pt-8 pb-3 px-1 sm:px-2 md:px-4 lg:px-6 w-full gap-3">
        <AddFile />
        <EditFile />
      </div>
      <FilesGrid init={files} />
    </ExtraProvider>
  );
}
