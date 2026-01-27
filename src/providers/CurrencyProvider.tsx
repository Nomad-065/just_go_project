import {type ReactNode, useState} from "react";
import {CurrencyContext, type Currency, type CurrencyContextType} from "../context/CurrencyContext.ts";


// Map currency codes to symbols
const currencySymbols: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};


export const CurrencyProvider = ({children}: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  const setCurrency = (cur: Currency) => {
    setCurrencyState(cur);
  };

  const value: CurrencyContextType = {
    currency,
    currencySymbol: currencySymbols[currency],
    setCurrency,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

