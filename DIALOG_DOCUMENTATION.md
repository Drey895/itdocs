# Документация: Как работает Dialog в проекте ITDocs

## Обзор

В данном проекте реализована кастомная система диалоговых окон (модальных окон) без использования сторонних библиотек. Диалоги используются для создания, редактирования и удаления различных сущностей: пользователей, групп и файлов.

## Архитектура Dialog

### Основные компоненты

Диалоги реализованы в следующих компонентах:

1. **AddGroup.jsx** - диалог для добавления новой группы
2. **AddUser.jsx** - диалог для добавления нового пользователя  
3. **AddFile.jsx** - диалог для загрузки файлов (два варианта: для групп и пользователей)
4. **FileCard.jsx** - диалог для редактирования/удаления файла
5. **GroupCard.jsx** - диалог для редактирования/удаления группы
6. **UserCard.jsx** - диалог для редактирования/удаления пользователя

### Принцип работы

Все диалоги следуют единому паттерну и состоят из следующих ключевых элементов:

#### 1. Управление состоянием

```javascript
const [showModal, setShowModal] = useState(false);
```

- Каждый диалог использует локальное состояние для управления видимостью
- `showModal` - булево значение, определяющее открыт ли диалог
- `setShowModal` - функция для изменения состояния

#### 2. Блокировка прокрутки

```javascript
useEffect(() => {
  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [showModal]);
```

- При открытии диалога блокируется прокрутка основной страницы
- При закрытии прокрутка восстанавливается

#### 3. Portal для рендеринга

```javascript
{showModal &&
  createPortal(
    <div className="fixed z-50 w-[-webkit-fill-available] h-full max-h-[100vh] bg-black/70 backdrop-blur-sm flex justify-center items-center">
      <div className="flex flex-col bg-white rounded-lg p-6 sm:w-[450px] lg:w-[600px] xl:w-[750px]">
        {/* Содержимое диалога */}
      </div>
    </div>,
    document.querySelector("main")
  )}
```

- Используется React DOM `createPortal` для рендеринга диалога вне основного DOM дерева
- Диалог рендерится в элемент `main`
- Обеспечивает правильное наложение и изоляцию

#### 4. CSS стилизация

**Фон диалога:**
```css
fixed z-50 w-[-webkit-fill-available] h-full max-h-[100vh] bg-black/70 backdrop-blur-sm flex justify-center items-center
```

- `fixed` - фиксированное позиционирование на весь экран
- `z-50` - высокий z-index для отображения поверх остального контента
- `bg-black/70` - полупрозрачный черный фон (70% непрозрачности)
- `backdrop-blur-sm` - размытие фона
- `flex justify-center items-center` - центрирование содержимого

**Контейнер диалога:**
```css
flex flex-col bg-white rounded-lg p-6 sm:w-[450px] lg:w-[600px] xl:w-[750px]
```

- `bg-white` - белый фон
- `rounded-lg` - скругленные углы
- `p-6` - отступы
- Адаптивная ширина в зависимости от размера экрана

#### 5. Управление формами

```javascript
const { register, setValue } = useForm({
  defaultValues: {
    // начальные значения
  }
});
```

- Используется библиотека `react-hook-form` для работы с формами
- `register` - регистрация полей формы
- `setValue` - программное изменение значений полей

#### 6. Server Actions

```javascript
const [state, action] = useFormState(addGroupAction, null);
```

- Используются Next.js Server Actions для отправки данных на сервер
- `useFormState` - хук для работы с серверными действиями
- Обеспечивает обработку форм на сервере

## Типы диалогов

### 1. Диалоги создания (Add*)

**Функциональность:**
- Создание новых сущностей (группы, пользователи, файлы)
- Валидация данных
- Обработка ошибок

**Пример использования (AddGroup):**
```javascript
<Button onClick={() => setShowModal(true)}>
  Добавить
</Button>
```

**Особенности:**
- Используют server actions для отправки данных
- После успешного создания обновляют интерфейс через context
- Автоматически перезагружают страницу после создания

### 2. Диалоги редактирования (*Card)

**Функциональность:**
- Редактирование существующих сущностей
- Удаление сущностей
- Просмотр детальной информации

**Пример использования (FileCard):**
```javascript
<div onClick={() => setShowModal(true)}>
  {/* Карточка файла */}
</div>
```

**Особенности:**
- Предзаполненные формы с текущими данными
- Кнопки "Редактировать" и "Удалить"
- Условная видимость в зависимости от прав пользователя

## Взаимодействие с контекстом

### ExtraContext

```javascript
const { setExtra } = use(ExtraContext);

if (file) {
  setExtra((prev) => [file, ...prev]);
  setShowModal(false);
  setFile(null);
  setTimeout(() => window.location.reload(), 100);
}
```

- Используется для обновления данных в интерфейсе
- Добавляет новые элементы в начало списка
- Закрывает диалог после успешной операции

## Обработка ошибок

```javascript
<div className="text-red-500">
  {state?.error ? state?.error : ""}
</div>
```

- Ошибки отображаются внизу диалога красным цветом
- Ошибки приходят от server actions через состояние `state`

## Специальные возможности

### 1. Drag & Drop файлов (AddFile)

```javascript
onDrop={(e) => {
  e.preventDefault();
  const fileInput = fileRef.current;
  const files = e.dataTransfer.files;
  if (!fileInput) return;
  fileInput.files = files;
  const file = fileInput.files[0];
  setValue("name", file.name || "");
  setValue("type", file.type || "application/octet-stream");
  setValue("size", getReadableFileSizeString(file.size));
}}
```

- Поддержка перетаскивания файлов
- Автоматическое заполнение метаданных файла

### 2. Загрузка файлов (FileCard)

```javascript
onClick={async () => {
  const base64String = await downloadFile(data.id, (await getUser()).id);
  // ... обработка загрузки
}}
```

- Преобразование base64 в blob
- Создание ссылки для загрузки
- Автоматическое скачивание файла

### 3. Генерация PDF отчетов (UserCard)

```javascript
onClick={async () => {
  const options = {
    margin: 0,
    filename: `Отчет ${data.username} ${new Date().toLocaleString("ru-RU")}.pdf`,
    // ... другие настройки
  };
  const node = document.querySelector(`#pdf-${data.id}`).cloneNode(true);
  node.style.display = "flex";
  await html2pdf().from(node).set(options).save();
}}
```

- Использование библиотеки html2pdf.js
- Скрытые элементы для генерации отчетов
- Клонирование DOM элементов

## Лучшие практики

### 1. Закрытие диалога

```javascript
<Button onClick={() => setShowModal(false)}>
  Закрыть
</Button>
```

- Всегда предоставляйте способ закрыть диалог
- Используйте понятные названия кнопок

### 2. Валидация форм

```javascript
<Input s={{ ...register("name"), required: true }} />
```

- Используйте встроенную валидацию react-hook-form
- Указывайте обязательные поля

### 3. Адаптивность

```javascript
className="sm:w-[450px] lg:w-[600px] xl:w-[750px]"
```

- Используйте адаптивные размеры для разных экранов
- Учитывайте мобильные устройства

### 4. Доступность

- Блокируйте прокрутку фона при открытом диалоге
- Используйте семантически правильные элементы форм
- Обеспечивайте понятную навигацию

## Заключение

Система диалогов в проекте ITDocs представляет собой хорошо продуманную архитектуру, которая:

- Использует современные React паттерны (hooks, portals)
- Обеспечивает единообразный пользовательский опыт
- Интегрируется с Next.js server actions
- Поддерживает сложные взаимодействия (drag&drop, загрузка файлов, генерация PDF)
- Адаптивна и доступна

Данный подход позволяет легко создавать новые диалоги, следуя установленным паттернам, и обеспечивает консистентность интерфейса во всем приложении.