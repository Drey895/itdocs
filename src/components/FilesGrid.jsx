"use client";

import { FileCard, Packer, Delegate } from "@/components";
import { ExtraContext } from "@/ExtraContext";
import { selectFilesByUser } from "@/queries/files";
import { getUser } from "@/user";
import { Suspense, useCallback, useEffect, useState, use } from "react";

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export function FilesGrid({ init }) {
  const [files, setFiles] = useState([init]);
  const [lastRequestedFileId, setLastRequestedFileId] = useState(null);

  const onScroll = useCallback(
    debounce(async (e) => {
      if (
        document.documentElement.scrollHeight - window.scrollY <=
        document.documentElement.clientHeight + window.scrollY * 0.2
      ) {
        const lastPack = await files[files.length - 1];
        if (lastPack.length < 15) return;
        const lastFile = lastPack[lastPack.length - 1];

        if (lastFile.id === lastRequestedFileId) return; // Prevent duplicate requests
        setLastRequestedFileId(lastFile.id); // Update last requested file ID

        const user = await getUser();

        const newPack = selectFilesByUser(user.id, 15, lastFile.id);
        if ((await newPack).length === 0) return;
        setFiles((prev) => [...prev, newPack]);
      }
    }, 250),
    [files, lastRequestedFileId]
  );

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  });

  const { extra, Delegate } = use(ExtraContext);

  return (
    <div className="w-full flex-1 grid grid-cols-auto-300 xl:grid-cols-auto-450 content-start justify-evenly place-content-center place-items-center justify-items-stretch gap-5 p-1 sm:p-2 md:p-4 lg:p-6 max-w-[1440px]">
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
