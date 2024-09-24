import { AuthLayout } from "@/AuthLayout";
import { SideBar } from "@/components";

export default function Layout({ children }) {
  return (
    <AuthLayout>
      <SideBar />
      <main className="flex flex-col sm:ml-[200px] md:ml-[300px] lg:ml-[350px] min-h-[100vh]">
        {children}
        <footer className="text-sm text-black/60 text-center font-mono tracking-wider">
          © 2024 Рей Денис. Все права защищены.
        </footer>
      </main>
    </AuthLayout>
  );
}
