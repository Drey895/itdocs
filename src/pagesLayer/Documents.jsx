import { AddFile, EditFile, FilesGrid } from "@/components/UserFileControl";
import { ExtraProvider } from "@/ExtraContext";
import { selectFilesByUser } from "@/queries/files";
import { getUser } from "@/user";

export async function Documents() {
  const user = await getUser();
  const files = selectFilesByUser(user.id, 30);
  return (
    <ExtraProvider user={user}>
      <title>Документы | IT-Docs</title>
      <div className="hidden sm:flex justify-end pt-8 pb-3 px-1 sm:px-2 md:px-4 lg:px-6 w-full gap-3">
        <AddFile />
        <EditFile />
      </div>
      <FilesGrid init={files} user={user} />
    </ExtraProvider>
  );
}
