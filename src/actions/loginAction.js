"use server";
import { selectUser } from "@/queries/users";
import { cookies } from "next/headers";

export async function loginAction(prevState, formData) {
  console.log(formData);
  try {
    const res = await selectUser(formData.get("username").trim());
    if (!res[0].password === formData.get("password").trim())
      return { error: "Ошибка авторизации" };
    const store = cookies();
    store.set("user", JSON.stringify(res));
    return { data: res };
  } catch (e) {
    return { error: "Ошибка авторизации" };
  }
}
