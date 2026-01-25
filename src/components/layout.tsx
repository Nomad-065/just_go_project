import {Outlet, Link, NavLink} from "react-router-dom";
import {cn} from "../utils/cn.ts";
import {useState} from "react";
import {Tooltip} from "@mui/material";
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import {useColourMode} from "../hooks/useColourMode.ts";
import ActionButton from "./ui/button/action-button.tsx";
import Brightness7Icon from '@mui/icons-material/Brightness7';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import HomeIcon from "@mui/icons-material/Home";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";

const Layout = () => {
  const {mode, toggleMode} = useColourMode();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navLinks = [
    {to: '/', label: 'Home', icon: HomeIcon,},
    {to: '/products', label: 'Product Catalog', icon: Inventory2Icon,},
    {to: '/products/categories', label: 'Product Categories', icon: CategoryIcon,},
    {to: '/products/search', label: 'Search Products', icon: SearchIcon,},
    {to: '/settings', label: 'Settings', icon: SettingsIcon,},
  ];

  const navLinkClasses = (isActive: boolean) =>
    cn(
      'p-1 w-8 h-8 rounded transition-all duration-300 ',
      isActive
        ? 'bg-white text-justgo-green font-semibold hover:bg-justgo-blue hover:text-white'
        : 'hover:bg-justgo-purple text-white hover:text-white hover:font-semibold'
    );

  return (
    <div className="h-screen w-full flex flex-col bg-justgo-green">
      <header className="flex justify-between items-center text-white p-4 h-12">
        <div className="flex w-fit gap-6 h-full justify-center items-center">
          <Tooltip title={isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}>
            <div
              onClick={() => setIsSidebarOpen(value => !value)}
              className={cn(
                'w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer flex-shrink-0',
                'hover:bg-justgo-purple transition-all'
              )}
            >
              {isSidebarOpen ? (
                <ViewSidebarOutlinedIcon className={'rotate-180'}/>
              ) : (
                <ViewSidebarIcon className={'rotate-180'}/>
              )}
            </div>
          </Tooltip>
          <Link to="/">
            <h1 className="text-lg font-bold">JustGo International</h1>
          </Link>
        </div>
        <div className="flex gap-6 items-center justify-between bg-white text-justgo-green rounded-md px-4">
          <ActionButton
            helperText={mode === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            onClick={toggleMode}
            className={'h-8 w-8 !border-none'}
            icon={mode === "dark" ? Brightness7Icon : BedtimeIcon}
          />
          <span>Username</span>
        </div>
      </header>
      <div className={'flex-1 flex w-full h-full overflow-hidden'}>
        {/* Sidebar */}
        <div
          className={cn(
            'flex flex-col py-4 items-center justify-start gap-4 transition-all duration-300 overflow-hidden flex-shrink-0',
            isSidebarOpen
              ? 'w-fit px-2 opacity-100 '
              : 'w-0 p-0 opacity-0 '
          )}
        >
          {navLinks.map(({to, label, icon: Icon}) => (
            <Tooltip
              key={to}
              title={label}
              placement="right"
              arrow
            >
              <NavLink to={to}>
                {({isActive}) => (
                  <div className="flex items-center justify-center">
                    <Icon className={navLinkClasses(isActive)}/>
                  </div>
                )}
              </NavLink>
            </Tooltip>
          ))}
        </div>
        <main className="flex-1 flex flex-col w-full min-h-0 overflow-hidden rounded-lg">
          <Outlet/>
        </main>
      </div>
      <footer className="text-gray-200 text-center items-center justify-center h-6 w-full">
        &copy; {new Date().getFullYear()} JustGo International. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
