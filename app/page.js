import AuthForm from "@/AuthForm";
import { AuthSwitch } from "@/AuthSwitch";
import Image from "next/image";

export default function Home() {
  return (
   <main className="w-full h-[100vh] flex flex-col justify-center items-center gap-2">
    <img src="/logo.png"/>
    <AuthSwitch/>
   </main>

  );
}
