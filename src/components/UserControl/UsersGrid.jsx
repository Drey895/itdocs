"use client";

import { Packer } from "@/components";
import { ExtraContext } from "@/ExtraContext";
import { selectFilesByGroup } from "@/queries/files/selectFilesByGroup";
import { debounce } from "@/utils";
import { useParams } from "next/navigation";
import { Suspense, use, useCallback, useEffect, useState } from "react";
import { UserCard } from ".";

export function UsersGrid({ init }) {
  const [files, setFiles] = useState([init]);
  const [lastRequestedFileId, setLastRequestedFileId] = useState(null);
  const params = useParams();

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

        const newPack = selectFilesByGroup(params.groupId, 15, lastFile.id);
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
    <div className="w-full flex-1 gap-5 p-1 sm:p-2 md:p-4 lg:p-6 flex flex-col">
      {extra.map((obj) => (
        <UserCard key={obj.id} data={obj} />
      ))}
      {files.map((filePack, i) => (
        <Suspense key={i} fallback={<></>}>
          <Packer Delegate={UserCard} packPromise={filePack} />
        </Suspense>
      ))}
    </div>
  );
}
