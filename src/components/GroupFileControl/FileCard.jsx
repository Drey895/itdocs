"use client";

import { deleteFileAction, downloadFile, updateFile } from "@/actions/file";
import { Button, Input } from "@/components";
import { ExtraContext } from "@/ExtraContext";
import { getUser } from "@/user";
import { use, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";

export function FileCard({ data }) {
  const formatter = Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: false,
    timeZone: "+0300",
  });

  const intFormatter = Intl.NumberFormat("ru-RU", {
    style: "decimal",
    maximumFractionDigits: 0,
    maximumSignificantDigits: 3,
    notation: "compact",
  });
  const { isSelectable, user } = use(ExtraContext);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  const { register } = useForm({
    defaultValues: {
      id: data.id,
      name: data.name,
      type: data.type,
      size: data.size,
    },
  });

  return (
    <>
      <div
        className={`flex justify-center items-center flex-col p-5 border shadow-sm rounded-lg min-w-[300px] gap-3 ${
          isSelectable &&
          (data.user_id === user.id || user.role === "admin"
            ? "border-red-300 cursor-pointer"
            : "border-blue-300 cursor-not-allowed")
        }`}
        onClick={(e) => {
          if (
            isSelectable &&
            (data.user_id === user.id || user.role === "admin")
          )
            setShowModal(true);
        }}
      >
        <div className="flex justify-between items-center w-full gap-2">
          <div className="font-mono text-lg truncate">{data.name}</div>
          <Button
            onClick={async () => {
              const base64String = await downloadFile(
                data.id,
                (
                  await getUser()
                ).id
              );
              if (!base64String) return;
              const binaryString = atob(base64String);
              const byteNumbers = new Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) {
                byteNumbers[i] = binaryString.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray], {
                type: data.type,
              });
              const link = document.querySelector(`#file-${data.id}`);
              link.href = URL.createObjectURL(blob);
              link.click();
              link.href = "";
            }}
            className={`bg-gray-100 hover:bg-gray-200 font-sans active:bg-gray-300 ${
              isSelectable ? "pointer-events-none" : ""
            }`}
          >
            Загрузить
          </Button>
        </div>
        <div className="flex flex-col gap-0.5 w-full">
          <div className="flex justify-between gap-3">
            <div className="font-bold">Тип:</div>
            <div className="font-sans text-right truncate">{data.type}</div>
          </div>
          <div className="flex justify-between gap-3">
            <div className="font-bold">Размер:</div>
            <div className="font-sans text-right">{data.size}</div>
          </div>
          <div className="flex justify-between gap-3">
            <div className="font-bold">Кол-во загрузок:</div>
            <div className="font-sans text-right">
              {intFormatter.format(data.download_count)}
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <div className="font-bold">Дата загрузки:</div>
            <div className="font-sans text-right">
              {formatter.format(data.created_at)}
            </div>
          </div>
        </div>
        <a id={`file-${data.id}`} download hidden />
      </div>
      {showModal &&
        createPortal(
          <div className="fixed z-50 w-[-webkit-fill-available] h-full max-h-[100vh] bg-black/70 backdrop-blur-sm flex justify-center items-center">
            <div className="flex flex-col bg-white rounded-lg p-6 sm:w-[450px] lg:w-[600px] xl:w-[750px]">
              <form
                className="flex flex-col gap-8 justify-center items-center"
                id="form"
              >
                <input type="hidden" {...register("id")} />
                <div className="flex flex-col w-full gap-4">
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="name">Имя</label>
                    <Input s={{ ...register("name"), required: true }} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="type">Тип</label>
                    <Input
                      s={{ ...register("type"), readOnly: true }}
                      className="bg-black/10"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="size">Размер</label>
                    <Input
                      s={{ ...register("size"), readOnly: true }}
                      className="bg-black/10"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-5 justify-between items-center w-full">
                  <Button
                    type="button"
                    className="rounded-lg hover:bg-red-100 active:bg-red-500 active:text-white"
                    onClick={async () => {
                      await deleteFileAction(data.id);
                      setShowModal(false);
                      setTimeout(() => window.location.reload(), 100);
                    }}
                  >
                    Удалить
                  </Button>
                  <div className="flex flex-row flex-nowrap gap-2">
                    <Button
                      type="button"
                      className="rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300"
                      onClick={() => setShowModal(false)}
                    >
                      Закрыть
                    </Button>

                    <Button
                      type="button"
                      className="rounded-lg hover:bg-red-100 active:bg-red-500 active:text-white"
                      onClick={async () => {
                        const formData = new FormData(form);
                        await updateFile(formData);
                        setShowModal(false);
                        setTimeout(() => window.location.reload(), 100);
                      }}
                    >
                      Редактировать
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>,
          document.querySelector("main")
        )}
    </>
  );
}
