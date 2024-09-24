"use client";

import { FileCard, Packer } from "@/components";
import { Suspense, useState } from "react";

export function FilesGrid({ init }) {
  const [files, setFiles] = useState([init]);
  return (
    <div className="grid p-5">
      {files.map((filePack, i) => (
        <Suspense key={i} fallback={<></>}>
          <Packer Delegate={FileCard} packPromise={filePack} />
        </Suspense>
      ))}
    </div>
  );
}
