"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const store = cookies();
  store.delete("user");

  return redirect("/");
}
