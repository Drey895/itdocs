import { Home } from "@/pagesLayer";
import { AuthLayout } from "@/AuthLayout";

export default function Page() {
  return (
    <AuthLayout>
      <Home />
    </AuthLayout>
  );
}
