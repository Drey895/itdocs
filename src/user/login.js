"use server";

import { cookies } from "next/headers";

export async function login(user) {
  const store = cookies();
  store.set("user", JSON.stringify(user));
}
