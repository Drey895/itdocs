import { AddUser, EditUser, UsersGrid } from "@/components/UserControl";
import { ExtraProvider } from "@/ExtraContext";
import { selectUsers } from "@/queries/users";
import { getUser } from "@/user";

export async function Users() {
  const user = await getUser();
  const users = selectUsers(50);
  return (
    <ExtraProvider user={user}>
      <title>Группы | IT-Docs</title>
      <div className="hidden sm:flex justify-end pt-8 pb-3 px-1 sm:px-2 md:px-4 lg:px-6 w-full gap-3">
        <AddUser />
        <EditUser />
      </div>
      <UsersGrid init={users} />
    </ExtraProvider>
  );
}
