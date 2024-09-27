"use client";

import { logout } from "@/user";
import Link from "next/link";
import { Button, NavButton } from ".";

export function SideBar({ user }) {
  return (
    <div className="hidden fixed h-[100vh] left-0 sm:flex flex-col justify-between border-r shadow sm:p-2 md:p-3 lg:p-4 sm:w-[175px] md:w-[225px] lg:w-[275px]">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="sm:w-[150px] lg:w-[200px]">
          <img className="w-full h-full" src="/logo.png" alt="" />
        </div>
        <div className="font-sans text-center">
          Здравствуйте, {user && user.username}!
        </div>
        <nav className="flex flex-col gap-1 justify-center w-full">
          <NavButton href={"/panel/documents"}>Документы</NavButton>
          <NavButton href={"/panel/groups"}>Группы</NavButton>
          {user && user.role === "admin" && (
            <>
              <NavButton href={"/panel/admin/users"}>Пользователи</NavButton>
            </>
          )}
        </nav>
      </div>
      <div className="flex flex-col gap-3 justify-center text-center text-black/60">
        <Link href="/about">О нас</Link>
        <Link href="/contacts">Контакты</Link>
        <Button
          className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-lg text-black"
          onClick={() => logout()}
        >
          Выход
        </Button>
      </div>
    </div>
  );
}
