import { DownloadStatsButton } from "@/components/downloadStatsButton";
import { downloadStat } from "@/queries/stats/downloadStat";
import { filesMonthStat } from "@/queries/stats/filesMonthStat";
import { filesStat } from "@/queries/stats/filesStat";
import { groupsMonthStat } from "@/queries/stats/groupsMonthStat";
import { groupsStat } from "@/queries/stats/groupsStat";

export async function Stats() {
  const files = await filesStat();
  const groups = await groupsStat();
  const download = await downloadStat();
  const filesMonth = await filesMonthStat();
  const groupsMonth = await groupsMonthStat();
  return (
    <>
      <title>Статистика | IT-Docs</title>
      <div className="flex justify-between items-center w-full px-16 pt-20 pb-5">
        <div className="font-bold text-xl font-sans">Отчет</div>
        <DownloadStatsButton />
      </div>
      <div className="flex-1 w-full">
        <div className="flex gap-3 p-10 flex-wrap">
          <div className="flex flex-col font-sans p-6 gap-0.5 border rounded shadow-sm max-w-[500px] min-w-[300px]">
            <div className="text-lg">Всего</div>
            <div className="border-t w-full"></div>
            <div className="flex justify-between gap-5">
              <div className="">Файлов</div>
              <div className="">{files}</div>
            </div>
            <div className="flex justify-between gap-5">
              <div className="">Групп</div>
              <div className="">{groups}</div>
            </div>
            <div className="flex justify-between gap-5">
              <div className="">Загрузок</div>
              <div className="">{download}</div>
            </div>
          </div>
          <div className="flex flex-col font-sans p-6 gap-0.5 border rounded shadow-sm max-w-[500px] min-w-[300px]">
            <div className="text-lg">За месяц</div>
            <div className="border-t w-full"></div>
            <div className="flex justify-between gap-5">
              <div className="">Файлов</div>
              <div className="">{filesMonth}</div>
            </div>
            <div className="flex justify-between gap-5">
              <div className="">Групп</div>
              <div className="">{groupsMonth}</div>
            </div>
          </div>
        </div>
      </div>
      <div id="pdf" className="hidden flex-col min-h-[100vh] w-full">
        <div className="flex justify-between items-center w-full px-16 pt-1">
          <div className="font-bold text-xl font-sans">Отчет</div>
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
                <div className="">{files}</div>
              </div>
              <div className="flex justify-between gap-5">
                <div className="">Групп</div>
                <div className="">{groups}</div>
              </div>
              <div className="flex justify-between gap-5">
                <div className="">Загрузок</div>
                <div className="">{download}</div>
              </div>
            </div>
            <div className="flex flex-col font-sans p-6 gap-0.5 border rounded shadow-sm max-w-[500px] min-w-[300px]">
              <div className="text-lg">За месяц</div>
              <div className="border-t w-full mt-2"></div>
              <div className="flex justify-between gap-5">
                <div className="">Файлов</div>
                <div className="">{filesMonth}</div>
              </div>
              <div className="flex justify-between gap-5">
                <div className="">Групп</div>
                <div className="">{groupsMonth}</div>
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
