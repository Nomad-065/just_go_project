import {useState} from "react";
import {
  User,
  Moon,
  Sun,
  Bell,
  Lock,
  Save,
} from "lucide-react";
import {useColourMode} from "../../hooks/useColourMode.ts";
import ActionButton from "../../components/ui/button/action-button.tsx";

const SettingsPage = () => {
  const {mode, toggleMode} = useColourMode();

  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);

  return (
    <div className="flex flex-col gap-6 p-6 h-full">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-justgo-green">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your account and application preferences
        </p>
      </div>

      {/* Settings sections */}
      <div className="flex flex-col gap-6 max-w-3xl">
        {/* Account */}
        <section className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-4">
            <User size={18} className="text-justgo-green"/>
            <h2 className="font-semibold">Account</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500">Username</label>
              <input
                value="username"
                disabled
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Email</label>
              <input
                value="user@justgo.com"
                disabled
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm bg-gray-100"
              />
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-4">
            {mode === "dark" ? (
              <Moon size={18} className="text-justgo-green"/>
            ) : (
              <Sun size={18} className="text-justgo-green"/>
            )}
            <h2 className="font-semibold">Appearance</h2>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-xs text-gray-500">
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
        </section>

        {/* Preferences */}
        <section className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={18} className="text-justgo-green"/>
            <h2 className="font-semibold">Preferences</h2>
          </div>

          <div className="flex flex-col gap-4">
            {/* Notifications */}
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium">Notifications</p>
                <p className="text-xs text-gray-500">
                  Receive system notifications
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="h-4 w-4"
              />
            </label>

            {/* Auto save */}
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium">Auto Save</p>
                <p className="text-xs text-gray-500">
                  Automatically save changes
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoSave}
                onChange={() => setAutoSave(!autoSave)}
                className="h-4 w-4"
              />
            </label>
          </div>
        </section>

        {/* Security */}
        <section className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={18} className="text-justgo-green"/>
            <h2 className="font-semibold">Security</h2>
          </div>

          <button className="text-sm text-justgo-green hover:underline">
            Change password
          </button>
        </section>

        {/* Save */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-justgo-green text-white px-4 py-2 rounded-md hover:opacity-90">
            <Save size={16}/>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
