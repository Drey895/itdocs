"use server";

import { cookies } from "next/headers";

export async function getUser() {
  const store = cookies();
  const user = store.get("user");
  if (store.has("user") && user.value != "") return JSON.parse(user.value);
  return {};
}
