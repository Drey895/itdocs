import { Home } from "@/Home";
import { AuthLayout } from "@/AuthLayout";

export default function Page() {
  return (
    <main className="w-full h-[100vh] flex flex-col justify-center items-center gap-2">
      <AuthLayout>
        <title>Добро пожаловать! | IT-Docs</title>
        <Home />
      </AuthLayout>
    </main>
  );
}
