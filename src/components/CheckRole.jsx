"use client";

import { useUser } from "@/hooks";
import { notFound } from "next/navigation";

export function CheckRole() {
  const user = useUser();
  if (user && user.role !== "admin") return notFound();
  return <></>;
}
