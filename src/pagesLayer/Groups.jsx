import { AddGroup, EditGroup, GroupGrid } from "@/components/GroupControl";
import { ExtraProvider } from "@/ExtraContext";
import { selectGroups } from "@/queries/groups";
import { getUser } from "@/user";

export async function Groups() {
  const user = await getUser();
  const groups = selectGroups(30);
  return (
    <ExtraProvider user={user}>
      <title>Группы | IT-Docs</title>
      <div className="hidden sm:flex justify-end pt-8 pb-3 px-1 sm:px-2 md:px-4 lg:px-6 w-full gap-3">
        <AddGroup />
        <EditGroup />
      </div>
      <GroupGrid init={groups} />
    </ExtraProvider>
  );
}
