import React, { createContext, useState, useContext, ReactNode } from "react";

export type Mode = "local" | "api";

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export const ModeContext = createContext<ModeContextType>({
  mode: "local",
  setMode: () => {},
});

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>("local");
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => useContext(ModeContext); 