import { downloadFile } from "@/actions/downloadFile";
import { Button } from ".";
import { use } from "react";

export function FileCard({ data }) {
  const formatter = Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: false,
    timeZone: "+0300",
  });
  return (
    <div className="flex justify-center items-center flex-col p-5 border shadow-sm rounded-lg min-w-[280px] gap-3">
      <div className="flex justify-between items-center w-full gap-2">
        <div className="font-mono text-lg break-words flex-shrink">
          {data.name}
        </div>
        <Button
          onClick={async () => {
            const base64String = await downloadFile(data.id);
            const binaryString = atob(base64String);
            const byteNumbers = new Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              byteNumbers[i] = binaryString.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], {
              type: "application/octet-stream",
            });
            const saveFile = await window.showSaveFilePicker({
              suggestedName: data.name,
            });
            const writable = await saveFile.createWritable();
            await writable.write(blob);
            await writable.close();
          }}
          className="bg-gray-100 hover:bg-gray-200 font-sans"
        >
          Загрузить
        </Button>
      </div>
      <div className="flex flex-col gap-0.5 w-full">
        <div className="flex justify-between gap-3">
          <div className="font-bold">Тип:</div>
          <div className="font-sans text-right">{data.type}</div>
        </div>
        <div className="flex justify-between gap-3">
          <div className="font-bold">Размер:</div>
          <div className="font-sans text-right">{data.size}</div>
        </div>
        <div className="flex justify-between gap-3">
          <div className="font-bold">Дата загрузки:</div>
          <div className="font-sans text-right">
            {formatter.format(data.created_at)}
          </div>
        </div>
      </div>
    </div>
  );
}
