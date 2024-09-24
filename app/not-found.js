import { defaultRedirect } from "@/actions";
import { AuthLayout } from "@/AuthLayout";

export default function NotFound() {
  return <AuthLayout>{defaultRedirect()}</AuthLayout>;
}
