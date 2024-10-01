"use client";

import html2pdf from "html2pdf.js";
import { Button } from ".";

export function DownloadStatsButton() {
  return (
    <Button
      onClick={async (e) => {
        const options = {
          margin: 0,
          filename: `Отчет ${new Date().toLocaleString("ru-RU")}.pdf`,
          html2canvas: { scale: 3 },
          image: { type: "jpeg", quality: 0.98 },
          jsPDF: {
            unit: "pt",
            orientation: "p",
          },
        };
        /** @type {any} */
        const node = document.querySelector("#pdf").cloneNode(true);
        node.style.display = "flex";
        await html2pdf().from(node).set(options).save();
      }}
      className={"bg-gray-100 hover:bg-gray-200 active:bg-gray-300"}
    >
      Скачать
    </Button>
  );
}
