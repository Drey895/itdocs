"use client";

import { AuthForm, RegForm } from "@/forms";
import Link from "next/link";
import { useEffect, useState } from "react";

export function AuthLayout({ children, user }) {
  const [current, setCurrent] = useState(true);
  const s = () => {
    setCurrent((c) => !c);
  };

  const [isRendered, setIsRendered] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsRendered(true);
    if (user?.id) {
      setIsAuth(true);
    }
  }, [user]);

  if (isAuth) {
    return children;
  }
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
            "fixed bottom-1 w-full flex flex-col justify-center items-center gap-2 md:flex-row md:gap-5 text-gray-800/75"
          }
        >
          <Link href={"/about"}>О нас</Link>
          <Link href={"/contacts"}>Контакты</Link>
        </footer>
      )}
    </>
  );
}
