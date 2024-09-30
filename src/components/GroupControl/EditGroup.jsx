"use client";

import { ExtraContext } from "@/ExtraContext";
import { Button } from "@/components";
import { use } from "react";

export function EditGroup() {
  const { setIsSelectable, user } = use(ExtraContext);

  return (
    user.role === "admin" && (
      <Button
        onClick={() => setIsSelectable((prev) => !prev)}
        className="rounded-lg hover:bg-red-200 active:bg-red-500 active:text-white"
      >
        Редактировать
      </Button>
    )
  );
}
