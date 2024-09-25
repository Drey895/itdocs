"use client";

import { notFound } from "next/navigation";

export function CheckRole(user) {
  if (user && user.role !== "admin") return notFound();
}
