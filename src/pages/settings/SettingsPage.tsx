import {
  User,
  Moon,
  Sun,
  CircleDollarSign,
} from "lucide-react";
import {useColourMode} from "../../hooks/useColourMode.ts";
import ActionButton from "../../components/ui/button/action-button.tsx";
import {useCurrency} from "../../hooks/useCurrency.ts";
import InputField from "../../components/ui/input/input-field.tsx";
import type {Currency} from "../../context/CurrencyContext.ts";

const SettingsPage = () => {
  const {mode, toggleMode} = useColourMode();
  const {currency, currencySymbol, setCurrency} = useCurrency();
  const currencies: Currency[] = ["USD", "EUR", "GBP"];


  return (
    <div className="flex flex-col gap-6 p-6 h-full">
      {/* Page header */}
      <div className="flex w-fit items-center justify-center gap-2">
        <h1 className="text-2xl font-bold text-white bg-justgo-green px-3 py-1 rounded-full text-center">
          Settings
        </h1>
        <p>Manage your settings and preferences</p>
      </div>

      {/* Settings sections */}
      <div className="flex flex-col gap-6 max-w-3xl">
        {/* Account */}
        <div className="flex flex-col border border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <User size={22} className="text-justgo-green"/>
            <h2 className="font-semibold">Account</h2>
          </div>

          <div className="flex flex-col gap-4">
            <InputField label={'Username'} value={'Name of User'} readOnly/>
            <InputField label={'Email'} value={'email@justgo.com'} readOnly/>
          </div>
        </div>

        {/* Theme */}
        <div className="flex flex-col border border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            {mode === "dark" ? (
              <Moon size={22} className="text-justgo-green"/>
            ) : (
              <Sun size={22} className="text-justgo-green"/>
            )}
            <h2 className="font-semibold">Appearance</h2>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-xs">
                Switch between light and dark mode
              </p>
            </div>

            <ActionButton
              icon={mode === "dark" ? Sun : Moon}
              helperText={
                mode === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              onClick={toggleMode}
              className="h-8 w-8"
            />
          </div>
        </div>

        {/*Currency*/}
        <div className="flex flex-col border border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <CircleDollarSign size={22} className="text-justgo-green"/>
            <h2 className="font-semibold">Currency</h2>
          </div>

          <div className="flex items-start gap-8 justify-center px-4">
            <InputField label={'Active Currency'} value={`${currency} (${currencySymbol})`} readOnly/>
            {/* Radio buttons */}
            <div className="flex flex-col gap-2">
              {currencies.map((cur) => (
                <label key={cur} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="currency"
                    value={cur}
                    checked={currency === cur}
                    onChange={() => setCurrency(cur)}
                    className="accent-justgo-green"
                  />
                  <span className="text-sm font-medium">{cur}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
