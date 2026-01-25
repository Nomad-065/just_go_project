import {createContext, useContext} from "react";

export type ColourMode = "light" | "dark";

export interface ColourModeContextValue {
  mode: ColourMode;
  toggleMode: () => void;
  setMode: React.Dispatch<React.SetStateAction<ColourMode>>;
}

export const ColourModeContext =
  createContext<ColourModeContextValue | undefined>(undefined);

export const useColourMode = (): ColourModeContextValue => {
  const context = useContext(ColourModeContext);
  if (!context) {
    throw new Error("useColourMode must be used within ThemeModeProvider");
  }
  return context;
};