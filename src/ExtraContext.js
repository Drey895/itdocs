"use client";

import { createContext, useState } from "react";

export const ExtraContext = createContext(null);

export function ExtraProvider({ children, user }) {
  const [extra, setExtra] = useState([]);
  const [isSelectable, setIsSelectable] = useState(false);

  return (
    <ExtraContext.Provider
      value={{ extra, setExtra, isSelectable, setIsSelectable, user }}
    >
      {children}
    </ExtraContext.Provider>
  );
}
