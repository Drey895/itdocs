"use client";

import { useEffect, useState } from "react";
import { AuthForm, RegForm } from "./forms";

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

  if (!isRendered) return <title>Загрузка... | IT-Docs</title>;
  if (isAuth) return children;
  return (
    <>
      <title>Авторизация | IT-Docs</title>
      {current ? <AuthForm sw={s} /> : <RegForm sw={s} />}
    </>
  );
}
