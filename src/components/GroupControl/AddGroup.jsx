"use client";

import { addGroupAction } from "@/actions/group";
import { Button, Input } from "@/components";
import { ExtraContext } from "@/ExtraContext";
import { use, useEffect, useRef, useState } from "react";
import { createPortal, useFormState } from "react-dom";
import { useForm } from "react-hook-form";

export function AddGroup() {
  const [showModal, setShowModal] = useState(false);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const { setExtra } = use(ExtraContext);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  const [state, action] = useFormState(addGroupAction, null);
  const { register, setValue } = useForm();

  useEffect(() => {
    if (state?.data) {
      setFile(state?.data);
    }
  }, [state]);

  if (file) {
    setExtra((prev) => [file, ...prev]);
    setShowModal(false);
    setFile(null);
  }

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-lg"
      >
        Добавить
      </Button>
      {showModal &&
        createPortal(
          <div className="absolute z-50 w-[-webkit-fill-available] h-full max-h-[100vh] bg-black/70 backdrop-blur-sm flex justify-center items-center">
            <div className="flex flex-col bg-white rounded-lg p-6 sm:w-[450px] lg:w-[600px] xl:w-[750px]">
              <form
                action={action}
                className="flex flex-col gap-8 justify-center items-center"
              >
                <div className="flex flex-col w-full gap-4">
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="name">Название</label>
                    <Input s={{ ...register("name"), required: true }} />
                  </div>
                </div>
                <div className="flex flex-row gap-5 justify-between items-center w-full">
                  <div className="text-red-500">
                    {state?.error ? state?.error : ""}
                  </div>
                  <div className="flex flex-row flex-nowrap gap-2">
                    <Button
                      type="button"
                      className="rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300"
                      onClick={() => setShowModal(false)}
                    >
                      Закрыть
                    </Button>
                    <Button
                      type="submit"
                      className="rounded-lg hover:bg-red-100 active:bg-red-500 active:text-white"
                    >
                      Добавить
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
