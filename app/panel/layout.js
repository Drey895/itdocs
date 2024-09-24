import { AuthLayout } from "@/AuthLayout";
import { SideBar } from "@/components";

export default function Layout({ children }) {
  return (
    <AuthLayout>
      <SideBar />
      <main className="fixed w-[85%] h-[100vh] right-0">
        {children}
        <footer className="absolute bottom-1 w-full z-50 text-sm text-black/60 text-center font-mono tracking-wider">
          © 2024 Рей Денис. Все права защищены.
        </footer>
      </main>
    </AuthLayout>
  );
}
