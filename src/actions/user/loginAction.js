"use server";

import { selectUser } from "@/queries/users";
import { selectUserByUsername } from "@/queries/users/selectUserByUsername";
import { login } from "@/user";

export async function loginAction(prevState, formData) {
  console.log(formData);
  try {
    const res = await selectUserByUsername(formData.get("username").trim());
    console.log(res);
    if (res[0].password !== formData.get("password").trim())
      return { error: "Ошибка авторизации" };
    return await login(res[0]);
  } catch (e) {
    return { error: "Ошибка авторизации" };
  }
}
