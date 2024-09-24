import { Button } from ".";

export function FileCard({ data }) {
  const formatter = Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: false,
    timeZone: "+0300",
  });
  return (
    <div className="flex justify-center items-start flex-col p-5 border shadow-sm rounded-lg min-w-[350px] max-w-[450px] gap-2">
      <div className="flex justify-between items-center w-full gap-5">
        <div className="font-mono text-lg">{data.name}</div>
        <Button className="bg-gray-100 hover:bg-gray-200 font-sans">
          Загрузить
        </Button>
      </div>
      <div className="flex flex-col gap-0.5 w-full">
        <div className="flex justify-between gap-3">
          <div className="font-bold">Тип:</div>
          <div className="font-sans">{data.type}</div>
        </div>
        <div className="flex justify-between gap-3">
          <div className="font-bold">Размер:</div>
          <div className="font-sans">{data.size}</div>
        </div>
        <div className="flex justify-between gap-3">
          <div className="font-bold">Дата загрузки:</div>
          <div className="font-sans">{formatter.format(data.created_at)}</div>
        </div>
      </div>
    </div>
  );
}
