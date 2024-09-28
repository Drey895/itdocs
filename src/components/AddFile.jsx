"use client";

import { createPortal } from "react-dom";
import { Button, Input } from ".";
import { useEffect, useState, useRef, use } from "react";
import { useForm } from "react-hook-form";
import { uploadFile } from "@/actions/uploadFile";
import { useFormState } from "react-dom";
import { ExtraContext } from "@/ExtraContext";

function getReadableFileSizeString(fileSizeInBytes) {
  var i = -1;
  var byteUnits = [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
  do {
    fileSizeInBytes /= 1000;
    i++;
  } while (fileSizeInBytes > 1000);

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}

export function AddFile() {
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

  const [state, action] = useFormState(uploadFile, null);
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
                <div
                  className="w-full flex flex-wrap justify-center items-center p-20 border-2 text-sm text-center border-dashed rounded-lg gap-2"
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const fileInput = fileRef.current;
                    const files = e.dataTransfer.files;
                    if (!fileInput) return;
                    fileInput.files = files;
                    const file = fileInput.files[0];
                    setValue("name", file.name || "");
                    setValue("type", file.type || "application/octet-stream");
                    setValue("size", getReadableFileSizeString(file.size));
                  }}
                >
                  Перетащите файл или
                  <Button
                    type="button"
                    className="font-light bg-gray-100 hover:bg-gray-200 active:bg-gray-300"
                    onClick={() => fileRef.current.click()}
                  >
                    выберите
                  </Button>
                </div>
                <input
                  type="file"
                  {...register("file")}
                  ref={fileRef}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setValue("name", file.name || "");
                    setValue("type", file.type || "application/octet-stream");
                    setValue("size", getReadableFileSizeString(file.size));
                  }}
                  hidden
                />
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
