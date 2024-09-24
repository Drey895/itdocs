import { Button } from "@/components";
import { SideBar } from "@/components/SideBar";

export function Home() {
  return (
    <>
      <SideBar />
      <main className="fixed w-[85%] h-[100vh] right-0">
        <div className="flex justify-end p-8">
          <Button className="bg-gray-100 hover:bg-gray-200 rounded-lg">
            Добавить
          </Button>
        </div>
        <footer class="absolute bottom-0 w-full text-center z-50">
          <span class="text-sm text-black/60 text-center font-mono">
            © 2024 Рей Денис. Все права защищены.
          </span>
        </footer>
      </main>
    </>
  );
}
