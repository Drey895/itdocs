import { Group } from "@/pagesLayer/Group";
import { selectGroupById } from "@/queries/groups/selectGroupById";

export async function generateMetadata({ params }) {
  // read route params
  const id = params.groupId;

  // fetch data
  const group = await selectGroupById(id);

  return {
    title: `Группа ${group?.name ?? ""} | IT-Docs`,
  };
}

export default async function Page({ params }) {
  const group = await selectGroupById(params.groupId);
  if (!group) {
    return (
      <div className="w-full flex-1 p-1 sm:p-2 md:p-4 lg:p-6 flex justify-center items-center">
        404 Группа не найдена
      </div>
    );
  }
  return (
    <>
      <Group groupId={params.groupId} />
    </>
  );
}
