import { AuthLayout } from "@/AuthLayout";
import { SideBar } from "@/components";
import { getUser } from "@/user";

export default async function Layout({ children }) {
  const user = await getUser();
  return (
    <AuthLayout user={user}>
      <SideBar user={user} />
      <main className="flex flex-col items-center sm:ml-[175px] md:ml-[225px] lg:ml-[275px] min-h-[100vh]">
        {children}
        <footer className="text-sm text-black/60 text-center font-mono tracking-wider">
          © 2024 Рей Денис. Все права защищены.
        </footer>
      </main>
    </AuthLayout>
  );
}
