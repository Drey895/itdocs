"use client";

import { Packer } from "@/components";
import { ExtraContext } from "@/ExtraContext";
import { selectGroups } from "@/queries/groups";
import { debounce } from "@/utils";
import { Suspense, use, useCallback, useEffect, useState } from "react";
import { GroupCard } from ".";

export function GroupGrid({ init }) {
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

        const newPack = selectGroups(15, lastFile.id);
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

  const { extra } = use(ExtraContext);

  return (
    <div className="w-full flex-1 grid grid-cols-auto-300 xl:grid-cols-auto-450 content-start justify-evenly place-content-center place-items-center justify-items-stretch gap-5 p-1 sm:p-2 md:p-4 lg:p-6 max-w-[1440px]">
      {extra.map((obj) => (
        <GroupCard key={obj.id} data={obj} />
      ))}
      {files.map((filePack, i) => (
        <Suspense key={i} fallback={<></>}>
          <Packer Delegate={GroupCard} packPromise={filePack} />
        </Suspense>
      ))}
    </div>
  );
}
