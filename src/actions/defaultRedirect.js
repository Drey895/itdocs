"use server";

import { redirect } from "next/navigation";

export async function defaultRedirect() {
  return redirect("/panel/documents", "replace");
}
