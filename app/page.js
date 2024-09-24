import { Home } from "@/home";
import { AuthLayout } from "@/AuthLayout";

export default function Home() {
  return (
    <main className="w-full h-[100vh] flex flex-col justify-center items-center gap-2">
      <img src="/logo.png" alt="" />
      <AuthLayout>
        <title>Добро пожаловать! | IT-Docs</title>
        <Home/>
      </AuthLayout>
    </main>
  );
}
