"use client";

import { useUser } from "@/hooks";
import Link from "next/link";
import { Button, NavButton } from ".";

export function SideBar() {
  function logout() {
    localStorage.clear();
    window.location.reload();
  }

  const user = useUser();

  return (
    <div className="fixed w-[15%] h-[100vh] left-0 flex flex-col justify-between p-5 border-r shadow">
      <nav className="flex flex-col gap-1 justify-center">
        <NavButton href={"/panel/documents"}>Документы</NavButton>
        <NavButton href={"/panel/groups"}>Группы</NavButton>
        {user && user.role === "admin" && (
          <>
            <NavButton href={"/panel/users"}>Пользователи</NavButton>
          </>
        )}
      </nav>
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
