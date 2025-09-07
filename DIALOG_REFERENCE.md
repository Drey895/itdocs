# Dialog Implementation Reference

## Quick Start Template

### Basic Dialog Component

```jsx
"use client";

import { Button, Input } from "@/components";
import { use, useEffect, useState } from "react";
import { createPortal, useFormState } from "react-dom";
import { useForm } from "react-hook-form";

export function MyDialog() {
  const [showModal, setShowModal] = useState(false);
  
  // Block body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  const [state, action] = useFormState(myServerAction, null);
  const { register } = useForm();

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        Open Dialog
      </Button>
      
      {showModal &&
        createPortal(
          <div className="fixed z-50 w-[-webkit-fill-available] h-full max-h-[100vh] bg-black/70 backdrop-blur-sm flex justify-center items-center">
            <div className="flex flex-col bg-white rounded-lg p-6 sm:w-[450px] lg:w-[600px] xl:w-[750px]">
              <form action={action} className="flex flex-col gap-8 justify-center items-center">
                <div className="flex flex-col w-full gap-4">
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="name">Field Name</label>
                    <Input s={{ ...register("name"), required: true }} />
                  </div>
                </div>
                
                <div className="flex flex-row gap-5 justify-between items-center w-full">
                  <div className="text-red-500">
                    {state?.error ? state?.error : ""}
                  </div>
                  <div className="flex flex-row flex-nowrap gap-2">
                    <Button
                      type="button"
                      className="rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300"
                      onClick={() => setShowModal(false)}
                    >
                      Закрыть
                    </Button>
                    <Button
                      type="submit"
                      className="rounded-lg hover:bg-red-100 active:bg-red-500 active:text-white"
                    >
                      Сохранить
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>,
          document.querySelector("main")
        )}
    </>
  );
}
```

## Key Patterns

### 1. State Management
```jsx
const [showModal, setShowModal] = useState(false);
```

### 2. Body Scroll Control
```jsx
useEffect(() => {
  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [showModal]);
```

### 3. Portal Rendering
```jsx
{showModal && createPortal(
  // Dialog content
  document.querySelector("main")
)}
```

### 4. Server Actions Integration
```jsx
const [state, action] = useFormState(serverAction, null);
```

### 5. Form Handling
```jsx
const { register, setValue } = useForm({
  defaultValues: { /* initial values */ }
});
```

## CSS Classes Reference

### Dialog Backdrop
```css
fixed z-50 w-[-webkit-fill-available] h-full max-h-[100vh] bg-black/70 backdrop-blur-sm flex justify-center items-center
```

### Dialog Container
```css
flex flex-col bg-white rounded-lg p-6 sm:w-[450px] lg:w-[600px] xl:w-[750px]
```

### Button Styles
```css
/* Primary Button */
rounded-lg hover:bg-red-100 active:bg-red-500 active:text-white

/* Secondary Button */
rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300
```

## Dialog Types in Project

| Component | Purpose | Trigger | Features |
|-----------|---------|---------|----------|
| AddGroup | Create group | Button click | Form validation, Server action |
| AddUser | Create user | Button click | Form validation, Server action |
| AddFile | Upload file | Button click | Drag&drop, File metadata |
| FileCard | Edit/Delete file | Card click | Download, Edit, Delete |
| GroupCard | Edit/Delete group | Card click | Edit, Delete |
| UserCard | Edit/Delete user | Card click | PDF export, Edit, Delete |

## Common Features

### File Upload with Drag & Drop
```jsx
<div
  onDragOver={(e) => e.preventDefault()}
  onDrop={(e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    // Handle file drop
  }}
>
  Drop files here
</div>
```

### File Download
```jsx
const downloadFile = async () => {
  const base64String = await downloadFileAction(fileId, userId);
  const binaryString = atob(base64String);
  const byteArray = new Uint8Array(binaryString.split('').map(char => char.charCodeAt(0)));
  const blob = new Blob([byteArray], { type: fileType });
  const url = URL.createObjectURL(blob);
  // Create download link
};
```

### PDF Generation
```jsx
const generatePDF = async () => {
  const options = {
    margin: 0,
    filename: `report_${new Date().toLocaleString("ru-RU")}.pdf`,
    html2canvas: { scale: 3 },
    jsPDF: { unit: "pt", orientation: "p" }
  };
  const element = document.querySelector("#pdf-content").cloneNode(true);
  element.style.display = "flex";
  await html2pdf().from(element).set(options).save();
};
```

## Error Handling
```jsx
<div className="text-red-500">
  {state?.error ? state?.error : ""}
</div>
```

## Context Integration
```jsx
const { setExtra } = use(ExtraContext);

// After successful operation
if (result) {
  setExtra((prev) => [result, ...prev]);
  setShowModal(false);
  setTimeout(() => window.location.reload(), 100);
}
```

## Dependencies Required

```json
{
  "react": "latest",
  "react-dom": "latest", 
  "react-hook-form": "^7.53.0",
  "html2pdf.js": "^0.10.2"
}
```

## Best Practices

1. **Always provide close button** - Users need a way to exit
2. **Handle body scroll** - Prevent background scrolling
3. **Use portals** - Render outside component tree  
4. **Responsive sizing** - Adapt to different screen sizes
5. **Error feedback** - Show validation and server errors
6. **Loading states** - Indicate async operations
7. **Accessibility** - Proper focus management and labels