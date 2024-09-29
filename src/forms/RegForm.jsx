"use client";

import { regAction } from "@/actions/user";
import { Button, Input } from "@/components";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

export function RegForm({ sw }) {
  const [state, action] = useFormState(regAction, null);
  const { register } = useForm();

  const pwdRef = useRef(null);
  const { ref, ...rest } = register("password");

  if (state?.data) {
    localStorage.setItem("user", JSON.stringify(state.data));
    window.location.reload();
  }

  return (
    <div className="flex flex-col gap-6 font-mono">
      <h2 className="text-2xl text-center">Система регистрации</h2>
      <form action={action} className={"flex flex-col gap-4"}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <label htmlFor="username">Логин</label>
            <Input s={{ ...register("username"), required: true }} />
          </div>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="password">Пароль</label>
            <Input
              s={{ ...rest, ref: pwdRef, type: "password", required: true }}
            />
          </div>
          {state?.error !== null && (
            <div className="text-red-500">{state?.error}</div>
          )}
        </div>
        <div className="flex flex-col gap-2.5">
          <Button className="text-white bg-blue-500 hover:bg-blue-600">
            Регистрация
          </Button>
          <Button
            className="bg-white hover:bg-black/5"
            type="button"
            onClick={sw}
          >
            Назад
          </Button>
        </div>
      </form>
    </div>
  );
}
