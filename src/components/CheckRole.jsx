import { notFound } from "next/navigation";

export function checkRole(user) {
  if (user && user.role !== "admin") notFound();
}
