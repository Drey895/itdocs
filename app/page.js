import { Home } from "@/Home";
import { AuthLayout } from "@/AuthLayout";

export default function Page() {
export default function Page() {
  return (
    <main className="w-full h-[100vh] flex flex-col justify-center items-center gap-2">
      <AuthLayout>
        <Home />
      </AuthLayout>
    </main>
  );
}
