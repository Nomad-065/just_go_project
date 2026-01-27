import {useContext} from "react";
import {CurrencyContext, type CurrencyContextType} from "../context/CurrencyContext.ts";

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};