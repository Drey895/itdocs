"use server";

import { insertUser } from "@/queries/users";
import { login } from "@/user";

export async function regAction(prevState, formData) {
  const user = {
    username: formData.get("username").trim(),
    password: formData.get("password").trim(),
    role: "user",
  };

  if (user.username.indexOf(" ") !== -1 || user.password.indexOf(" ") !== -1)
    return { error: "Символы не поддерживаются" };

  try {
    const res = await insertUser(user);
    return await login(res[0]);
  } catch (e) {
    return { error: "Ошибка регистрации" };
  }
}
