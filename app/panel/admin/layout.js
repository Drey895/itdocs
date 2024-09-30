import { getUser } from "@/user";
import { notFound } from "next/navigation";

export default async function Layout({ children }) {
  const user = await getUser();
  if (user && user.role !== "admin") notFound();
  return children;
}
