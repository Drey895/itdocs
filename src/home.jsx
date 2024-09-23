export function Home(){
    return <>
    <header className="">
        
        <nav className="flex bg-[#3BABE3] fixed w-full p-5 text-white">
            <ul className="flex justify-around md:gap-10 md:justify-center w-full">
                <li><a href="#" className="">Главная</a></li>
                <li><a href="#">О нас</a></li>
                <li><a href="#">Поиск</a></li>
                <li><a href="#">Контакты</a></li>
            </ul>
        </nav>
    </header>

    <main className="flex flex-col justify-center items-center w-full h-[85vh]">
        <div className="h-[250px] w-[250px]">
        <img className="h-full w-full" src="/Group 9.png" alt="" />
        </div>
        
        <section className="">
            <div className="" data-wow-duration="2s">            
                <div id="" className="">
                    <ul>
                        <li className="flex flex-col lg:flex-row gap-10">
                            <a href="#" className="flex justify-center items-center py-2 px-5 bg-green-400 rounded hover:bg-green-500" data-filter="*">Список документов</a>
                            <a href="#" className="flex justify-center items-center py-2 px-5 bg-yellow-400 rounded hover:bg-yellow-500" data-filter="">Редактирование документов</a>
                            <a href="#" className="flex justify-center items-center py-2 px-5 bg-red-400 rounded hover:bg-red-500" data-filter="">Управление пользователями</a>
                                
                        </li>
                    </ul>
                </div>            
            </div>
        </section>
    </main>

    <footer className="flex justify-center lg:flex-row fixed bottom-0 py-5 w-full bg-[#3BABE3] text-white">
        <div className="flex-col lg:flex-row justify-center items-center">
            <div className="text-center">Copyright © 2024 Rey Denis. Все права защищены.</div>
            <div className="text-center">site-version 0.1</div>
        </div>
    </footer>

    </>
}