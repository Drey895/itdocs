"use server";

import { selectUser } from "@/queries/users";
import { login } from "@/user";

export async function loginAction(prevState, formData) {
  console.log(formData);
  try {
    const res = await selectUser(formData.get("username").trim());
    if (!res[0].password === formData.get("password").trim())
      return { error: "Ошибка авторизации" };
    return await login(res[0]);
  } catch (e) {
    return { error: "Ошибка авторизации" };
  }
}
