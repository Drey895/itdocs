import { AddFile, EditFile, FilesGrid } from "@/components/GroupFileControl";
import { ExtraProvider } from "@/ExtraContext";
import { selectFilesByGroup } from "@/queries/files/selectFilesByGroup";
import { selectGroupById } from "@/queries/groups/selectGroupById";
import { getUser } from "@/user";

export async function Group({ groupId }) {
  const user = await getUser();
  const group = await selectGroupById(groupId);
  const files = selectFilesByGroup(groupId, 30);
  return (
    <ExtraProvider user={user}>
      <div className="hidden sm:flex justify-end pt-8 pb-3 px-1 sm:px-2 md:px-4 lg:px-6 w-full gap-3">
        <AddFile />
        <EditFile />
      </div>
      <div className="text-lg font-mono self-start sm:px-2 md:px-4 lg:px-6 py-3">
        Группа {group.name}
      </div>
      <FilesGrid init={files} />
    </ExtraProvider>
  );
}
