"use client";

import { deleteUserAction } from "@/actions/user/deleteUserAction";
import { updateUserAction } from "@/actions/user/updateUserAction";
import { Button, Input } from "@/components";
import { ExtraContext } from "@/ExtraContext";
import { selectFilesByUser } from "@/queries/files";
import html2pdf from "html2pdf.js";
import { use, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { FilesGrid } from "../UserFileControl";

export function UserCard({ data }) {
  const dateFormatter = Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: false,
    timeZone: "+0300",
  });

  const { isSelectable } = use(ExtraContext);

  const [showModal, setShowModal] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

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
      username: data.username,
      password: data.password,
      download_count: data.download_count,
      created_at: dateFormatter.format(new Date(data.created_at)),
      role: data.role === "admin",
    },
  });

  return (
    <>
      <div
        className={`flex justify-center items-center flex-col p-5 border shadow-sm rounded-lg w-full gap-0 ${
          isSelectable ? "border-red-300 cursor-pointer" : ""
        }`}
        onClick={(e) => {
          if (!isSelectable) return;
          else setShowModal(true);
        }}
      >
        <div
          id={`pdf-${data.id}`}
          className="hidden flex-col min-h-[100vh] w-full"
        >
          <div className="flex justify-between items-center w-full px-16 pt-1">
            <div className="font-bold text-xl font-sans">
              Отчет {data.username}
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
                  <div className="">{data.files}</div>
                </div>
                <div className="flex justify-between gap-5">
                  <div className="">Общедоступных файлов</div>
                  <div className="">{data.group_files}</div>
                </div>
                <div className="flex justify-between gap-5">
                  <div className="">Загрузок</div>
                  <div className="">{data.download_count}</div>
                </div>
              </div>
            </div>
          </div>
          <footer className="p-1 text-sm text-black/60 text-center font-mono tracking-wider">
            © 2024 Рей Денис. Все права защищены.
          </footer>
        </div>
        <div className="flex justify-between items-center w-full gap-2">
          <div className="flex flex-row gap-2 items-center">
            <button
              onClick={() => setShowGrid((prev) => !prev)}
              className="text-slate-800 transition-transform duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                {showGrid ? (
                  <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                ) : (
                  <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                )}
              </svg>
            </button>

            <div className="font-mono text-lg truncate">{data.username}</div>
          </div>
          <Button
            onClick={async () => {
              const options = {
                margin: 0,
                filename: `Отчет ${data.username} ${new Date().toLocaleString(
                  "ru-RU"
                )}.pdf`,
                html2canvas: { scale: 3 },
                image: { type: "jpeg", quality: 0.98 },
                jsPDF: {
                  unit: "pt",
                  orientation: "p",
                },
              };
              /** @type {any} */
              const node = document
                .querySelector(`#pdf-${data.id}`)
                .cloneNode(true);
              node.style.display = "flex";
              await html2pdf().from(node).set(options).save();
            }}
            className={`bg-gray-100 hover:bg-gray-200 font-sans active:bg-gray-300 ${
              isSelectable ? "pointer-events-none" : ""
            }`}
          >
            Загрузить
          </Button>
        </div>
        <div
          className={`transition-all duration-300 ease-in-out transform-gpu w-full ${
            !showGrid
              ? "max-h-0 overflow-hidden"
              : "max-h-[50vh] overflow-auto mt-5"
          }`}
        >
          <FilesGrid
            init={selectFilesByUser(data.id, 30)}
            user={data}
            el={`userfiles-${data.id}`}
          />
        </div>
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
                    <label htmlFor="id">Идентификатор</label>
                    <Input s={{ ...register("id"), readOnly: true }} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="username">Логин</label>
                    <Input s={{ ...register("username"), required: true }} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="password">Пароль</label>
                    <Input
                      s={{ ...register("password"), required: true }}
                      className="bg-black/10"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row-reverse p-1 gap-3 items-center justify-start">
                      <label htmlFor="role" className="flex-1">
                        Администратор
                      </label>
                      <Input
                        s={{ ...register("role"), type: "checkbox" }}
                        className={"w-min"}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="download_count">Кол-во загрузок</label>
                    <Input
                      s={{ ...register("download_count"), readOnly: true }}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="created_at">Дата создания</label>
                    <Input s={{ ...register("created_at"), readOnly: true }} />
                  </div>
                </div>
                <div className="flex flex-row gap-5 justify-between items-center w-full">
                  <Button
                    type="button"
                    className="rounded-lg hover:bg-red-100 active:bg-red-500 active:text-white"
                    onClick={async () => {
                      await deleteUserAction(data.id);
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
                        // @ts-ignore
                        const formData = new FormData(form);
                        await updateUserAction(formData);
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
