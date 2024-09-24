"use client";

import Link from "next/link";
import { Button } from "./Button";

export function SideBar() {
  function logout() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div
      className="fixed w-[15%] h-[100vh] left-0 
    flex flex-col justify-between p-5 border-r shadow"
    >
      <div className="flex flex-col gap-1 justify-center">
        <Button className="bg-red-500 text-white text-right px-2">
          Документы
        </Button>
        <Button className="hover:bg-red-100 text-right px-2">
          Пользователи
        </Button>
        <Button className="hover:bg-red-100 text-right px-2">Группы</Button>
      </div>
      <div className="flex flex-col gap-3 justify-center text-center text-black/60">
        <Link href="/about">О нас</Link>
        <Link href="/contacts">Контакты</Link>
        <Button
          className="bg-gray-100 hover:bg-gray-200 rounded-lg text-black"
          onClick={logout}
        >
          Выход
        </Button>
      </div>
    </div>
  );
}
