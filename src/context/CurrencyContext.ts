import { createContext } from "react";

export type Currency = "USD" | "EUR" | "GBP";

export interface CurrencyContextType {
  currency: Currency;
  currencySymbol: string;
  setCurrency: (currency: Currency) => void;
}


// Only export the context here — no components!
export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);
