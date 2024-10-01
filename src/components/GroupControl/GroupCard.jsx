"use client";

import { deleteGroupAction } from "@/actions/group/deleteGroupAction";
import { editGroupAction } from "@/actions/group/editGroupAction";
import { Button, Input } from "@/components";
import { ExtraContext } from "@/ExtraContext";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";

export function GroupCard({ data }) {
  const router = useRouter();
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
    },
  });

  return (
    <>
      <div
        className={`flex justify-center items-center flex-col p-5 border shadow-sm rounded-lg min-w-[300px] gap-3 cursor-pointer ${
          isSelectable && user.role === "admin" ? "border-red-300" : ""
        }`}
        onClick={(e) => {
          if (!(isSelectable && user.role === "admin")) {
            router.push(`/panel/groups/${data.id}`);
            return;
          }
          setShowModal(true);
        }}
      >
        <div className="flex justify-between items-center w-full gap-2">
          <div className="font-mono text-lg truncate">{data.name}</div>
          <div>{data.count}</div>
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
                    <label htmlFor="name">Имя</label>
                    <Input s={{ ...register("name"), required: true }} />
                  </div>
                </div>
                <div className="flex flex-row gap-5 justify-between items-center w-full">
                  <Button
                    type="button"
                    className="rounded-lg hover:bg-red-100 active:bg-red-500 active:text-white"
                    onClick={async () => {
                      await deleteGroupAction(data.id);
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
                        await editGroupAction(formData);
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
