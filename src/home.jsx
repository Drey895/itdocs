import { Button } from "./components";

export function Home() {
  return (
    <>
      <div className="fixed w-[15%] h-[100vh] left-0 flex flex-col justify-between p-10 bg-[#dfdfdf]">
        <div className="flex flex-col gap-5 justify-center">
          <Button className=" text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 z-50 ">
            Документы
          </Button>
          <Button className=" text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 z-50 ">
            Пользователи
          </Button>
          <Button className=" text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 z-50 ">
            Группы
          </Button>
        </div>
        <div className="flex flex-col justify-center">
          <Button className=" text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 z-50 ">
            Выход
          </Button>
        </div>
      </div>
      <div className="fixed w-[85%] h-[100vh] right-0">
        <div className="flex justify-end p-10">
          <Button className=" text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 z-50 ">
            Добавить файл
          </Button>
        </div>
        <footer class="absolute bottom-0 w-full p-4 bg-[#dfdfdf] shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 Рей Денис. Все права защищены.
          </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                О нас
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Политика конфиденциальности
              </a>
            </li>

            <li>
              <a href="#" class="hover:underline">
                Контакты
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
