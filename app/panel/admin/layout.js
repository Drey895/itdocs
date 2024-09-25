import { CheckRole } from "@/components";

export default async function Layout({ children }) {
  const user = await getUser();
  CheckRole(user);
  return children;
}
