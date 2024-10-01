"use client";

import { Packer } from "@/components";
import { ExtraContext } from "@/ExtraContext";
import { selectFilesByUser } from "@/queries/files";
import { debounce } from "@/utils";
import { Suspense, use, useCallback, useEffect, useState } from "react";
import { FileCard } from ".";

export function FilesGrid({ init, user, el = "document" }) {
  const [files, setFiles] = useState([init]);
  const [lastRequestedFileId, setLastRequestedFileId] = useState(null);

  const onScroll = useCallback(
    debounce(async (e) => {
      if (
        document.documentElement.scrollHeight - window.scrollY <=
        document.documentElement.clientHeight + window.scrollY * 0.2
      ) {
        let sum = 0;
        for await (const filePack of files) {
          sum += filePack.length;
        }
        console.log(sum);

        const lastPack = await files[files.length - 1];
        if (lastPack.length < 15) return;
        const lastFile = lastPack[lastPack.length - 1];

        if (lastFile.id === lastRequestedFileId) return; // Prevent duplicate requests
        setLastRequestedFileId(lastFile.id); // Update last requested file ID

        const newPack = selectFilesByUser(user.id, 15, lastFile.id);
        if ((await newPack).length === 0) return;
        setFiles((prev) => [...prev, newPack]);
      }
    }, 500),
    [files, lastRequestedFileId]
  );

  useEffect(() => {
    if (el === "document") document.addEventListener("scroll", onScroll);
    else
      document
        .querySelector(`#${el}`)
        .parentElement.addEventListener("scroll", onScroll);
    return () => {
      try {
        if (el === "document") document.removeEventListener("scroll", onScroll);
        else
          document
            .querySelector(`#${el}`)
            .parentElement.removeEventListener("scroll", onScroll);
      } catch (e) {}
    };
  });

  const { extra, Delegate } = use(ExtraContext);

  return (
    <div
      id={`userfiles-${user.id}`}
      className="w-full flex-1 grid grid-cols-auto-300 xl:grid-cols-auto-450 content-start justify-evenly place-content-center place-items-center justify-items-stretch gap-5 p-1 sm:p-2 md:p-4 lg:p-6 max-w-[1440px]"
    >
      {extra.map((obj) => (
        <FileCard key={obj.id} data={obj} />
      ))}
      {files.map((filePack, i) => (
        <Suspense key={i} fallback={<></>}>
          <Packer Delegate={FileCard} packPromise={filePack} />
        </Suspense>
      ))}
    </div>
  );
}
