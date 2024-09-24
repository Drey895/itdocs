"use client";

import { useEffect, useState } from "react";
import { AuthForm, RegForm } from "@/forms";
import Link from "next/link";

export function AuthLayout({ children }) {
  const [current, setCurrent] = useState(true);
  const s = () => {
    setCurrent((c) => !c);
  };

  const [isRendered, setIsRendered] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) setIsAuth(true);
    setIsRendered(true);
  }, []);

  if (isAuth) return children;
  return (
    <>
      <main className="w-full h-[100vh] flex flex-col justify-center items-center gap-2">
        <img src="/logo.png" alt="" />
        {isRendered ? (
          <>
            <title>Авторизация | IT-Docs</title>
            {current ? <AuthForm sw={s} /> : <RegForm sw={s} />}
          </>
        ) : (
          <title>Загрузка... | IT-Docs</title>
        )}
      </main>
      {isRendered && (
        <footer
          className={
            "fixed bottom-1 flex flex-col md:flex-row gap-5 text-gray-800/75"
          }
        >
          <Link href={"/about"}>О нас</Link>
          <Link href={"/contacts"}>Контакты</Link>
        </footer>
      )}
    </>
  );
}
