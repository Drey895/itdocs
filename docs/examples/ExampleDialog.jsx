"use client";

import { Button, Input } from "@/components";
import { use, useEffect, useState } from "react";
import { createPortal, useFormState } from "react-dom";
import { useForm } from "react-hook-form";

/**
 * Example Dialog Component - демонстрирует основные принципы работы диалогов в проекте
 * 
 * Этот компонент показывает:
 * 1. Управление состоянием модального окна
 * 2. Блокировку прокрутки страницы
 * 3. Рендеринг через Portal
 * 4. Интеграцию с react-hook-form
 * 5. Работу с Server Actions
 * 6. Обработку ошибок
 * 7. Адаптивную стилизацию
 */
export function ExampleDialog({ title = "Пример диалога", onSubmit }) {
  // 1. Состояние для управления видимостью диалога
  const [showModal, setShowModal] = useState(false);
  
  // 2. Блокировка прокрутки страницы при открытом диалоге
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    // Cleanup при размонтировании компонента
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  // 3. Интеграция с Server Actions (если передана функция onSubmit)
  const [state, action] = useFormState(onSubmit || (() => {}), null);
  
  // 4. Управление формой с помощью react-hook-form
  const { register, reset, watch } = useForm({
    defaultValues: {
      name: "",
      email: "",
      description: ""
    }
  });

  // 5. Обработка успешной отправки
  useEffect(() => {
    if (state?.success) {
      setShowModal(false);
      reset(); // Очищаем форму
      
      // Здесь можно добавить уведомление об успехе
      console.log("Форма успешно отправлена!");
    }
  }, [state, reset]);

  // 6. Функция для закрытия диалога
  const closeDialog = () => {
    setShowModal(false);
    reset(); // Очищаем форму при закрытии
  };

  // 7. Функция для открытия диалога
  const openDialog = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* Кнопка для открытия диалога */}
      <Button
        onClick={openDialog}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
      >
        Открыть {title}
      </Button>

      {/* Диалог рендерится через Portal только когда showModal === true */}
      {showModal &&
        createPortal(
          // Фон диалога - занимает весь экран
          <div className="fixed z-50 w-[-webkit-fill-available] h-full max-h-[100vh] bg-black/70 backdrop-blur-sm flex justify-center items-center">
            
            {/* Контейнер диалога - адаптивные размеры */}
            <div className="flex flex-col bg-white rounded-lg p-6 sm:w-[450px] lg:w-[600px] xl:w-[750px] max-h-[90vh] overflow-y-auto">
              
              {/* Заголовок диалога */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Заполните форму ниже для отправки данных
                </p>
              </div>

              {/* Форма */}
              <form 
                action={action}
                className="flex flex-col gap-6"
              >
                {/* Поля формы */}
                <div className="flex flex-col w-full gap-4">
                  
                  {/* Поле имени */}
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="name" className="font-medium text-gray-700">
                      Имя *
                    </label>
                    <Input 
                      s={{ 
                        ...register("name", { 
                          required: "Поле обязательно для заполнения",
                          minLength: {
                            value: 2,
                            message: "Минимум 2 символа"
                          }
                        })
                      }} 
                      placeholder="Введите ваше имя"
                    />
                  </div>

                  {/* Поле email */}
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="email" className="font-medium text-gray-700">
                      Email *
                    </label>
                    <Input 
                      s={{ 
                        ...register("email", { 
                          required: "Email обязателен",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Некорректный email"
                          }
                        }),
                        type: "email"
                      }} 
                      placeholder="example@email.com"
                    />
                  </div>

                  {/* Поле описания */}
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="description" className="font-medium text-gray-700">
                      Описание
                    </label>
                    <textarea 
                      {...register("description")}
                      className="border border-gray-300 rounded-md p-2 min-h-[80px] resize-vertical"
                      placeholder="Дополнительная информация..."
                    />
                  </div>
                </div>

                {/* Область для отображения ошибок */}
                {state?.error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <div className="text-red-700 text-sm">
                      <strong>Ошибка:</strong> {state.error}
                    </div>
                  </div>
                )}

                {/* Кнопки управления */}
                <div className="flex flex-row gap-3 justify-between items-center w-full pt-4 border-t">
                  
                  {/* Индикатор отправки */}
                  <div className="flex-1">
                    {state?.loading && (
                      <div className="text-blue-600 text-sm flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                            fill="none"
                          />
                          <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Отправка...
                      </div>
                    )}
                  </div>

                  {/* Кнопки действий */}
                  <div className="flex flex-row flex-nowrap gap-2">
                    
                    {/* Кнопка отмены */}
                    <Button
                      type="button"
                      className="rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 border border-gray-300"
                      onClick={closeDialog}
                    >
                      Отмена
                    </Button>

                    {/* Кнопка отправки */}
                    <Button
                      type="submit"
                      className="rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white"
                      disabled={state?.loading}
                    >
                      {state?.loading ? "Отправка..." : "Отправить"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>,
          
          // Рендерим в элемент main (как и в других компонентах проекта)
          document.querySelector("main")
        )}
    </>
  );
}

/**
 * Пример Server Action для обработки формы
 * Эта функция должна быть определена в отдельном файле с директивой "use server"
 */
/*
"use server";

export async function exampleServerAction(prevState, formData) {
  try {
    // Получаем данные из формы
    const name = formData.get("name");
    const email = formData.get("email");
    const description = formData.get("description");

    // Валидация на сервере
    if (!name || name.length < 2) {
      return { error: "Имя должно содержать минимум 2 символа" };
    }

    if (!email || !/^\S+@\S+$/i.test(email)) {
      return { error: "Введите корректный email" };
    }

    // Симуляция задержки
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Здесь бы была логика сохранения в базу данных
    console.log("Сохраняем данные:", { name, email, description });

    // Возвращаем успешный результат
    return { 
      success: true, 
      message: "Данные успешно сохранены",
      data: { name, email, description }
    };

  } catch (error) {
    console.error("Ошибка сервера:", error);
    return { 
      error: "Произошла ошибка на сервере. Попробуйте позже." 
    };
  }
}
*/