"use client";

import { FileCard, Packer } from "@/components";
import { Suspense, useEffect, useRef, useState } from "react";

export function FilesGrid({ init }) {
  const [files, setFiles] = useState([init]);
  const containerRef = useRef(null);

  function onScroll(e) {
    console.log(e.target);
  }

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  });

  return (
    <div className="w-full flex-1 grid grid-cols-auto-fill-300 content-start justify-evenly place-content-center place-items-center justify-items-stretch gap-5 p-5">
      {files.map((filePack, i) => (
        <Suspense key={i} fallback={<></>}>
          <Packer Delegate={FileCard} packPromise={filePack} />
        </Suspense>
      ))}
    </div>
  );
}
