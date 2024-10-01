import { DownloadStatsButton } from "@/components/downloadStatsButton";
import { getUser } from "@/user";

export default async function Page() {
  const user = await getUser();
  return (
    <>
      <title>Статистика | IT-Docs</title>
      <div className="flex justify-between items-center w-full px-16 pt-20 pb-5">
        <div className="font-bold text-xl font-sans">Отчет {user.username}</div>
        <DownloadStatsButton />
      </div>
      <div className="flex-1 w-full">
        <div className="flex gap-3 p-10 flex-wrap">
          <div className="flex flex-col font-sans p-6 gap-0.5 border rounded shadow-sm max-w-[500px] min-w-[300px]">
            <div className="text-lg">Всего</div>
            <div className="border-t w-full mt-2"></div>
            <div className="flex justify-between gap-5">
              <div className="">Файлов</div>
              <div className="">{user.files}</div>
            </div>
            <div className="flex justify-between gap-5">
              <div className="">Общедоступных файлов</div>
              <div className="">{user.group_files}</div>
            </div>
            <div className="flex justify-between gap-5">
              <div className="">Загрузок</div>
              <div className="">{user.download_count}</div>
            </div>
          </div>
        </div>
      </div>
      <div id={`pdf`} className="hidden flex-col min-h-[100vh] w-full">
        <div className="flex justify-between items-center w-full px-16 pt-1">
          <div className="font-bold text-xl font-sans">
            Отчет {user.username}
          </div>
          <div className="h-full flex-0">
            <img className="w-full h-full" src="/logo.png" alt="" />
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="flex gap-3 py-3 px-10 flex-wrap">
            <div className="flex flex-col font-sans p-6 gap-0.5 border rounded shadow-sm max-w-[500px] min-w-[300px]">
              <div className="text-lg">Всего</div>
              <div className="border-t w-full mt-2"></div>
              <div className="flex justify-between gap-5">
                <div className="">Файлов</div>
                <div className="">{user.files}</div>
              </div>
              <div className="flex justify-between gap-5">
                <div className="">Общедоступных файлов</div>
                <div className="">{user.group_files}</div>
              </div>
              <div className="flex justify-between gap-5">
                <div className="">Загрузок</div>
                <div className="">{user.download_count}</div>
              </div>
            </div>
          </div>
        </div>
        <footer className="p-1 text-sm text-black/60 text-center font-mono tracking-wider">
          © 2024 Рей Денис. Все права защищены.
        </footer>
      </div>
    </>
  );
}
