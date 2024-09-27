"use client";

import { createContext, useState } from "react";

export const ExtraContext = createContext(null);

export function ExtraProvider({ children }) {
  const [extra, setExtra] = useState([]);

  return (
    <ExtraContext.Provider value={{ extra, setExtra }}>
      {children}
    </ExtraContext.Provider>
  );
}
