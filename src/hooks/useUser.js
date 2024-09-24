import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user"))[0]);
  }, []);
  return user;
}
