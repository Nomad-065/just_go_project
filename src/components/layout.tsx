import {Outlet, Link, NavLink, useLocation} from "react-router-dom";
import {cn} from "../utils/cn.ts";
import {useEffect, useState} from "react";
import {Tooltip} from "@mui/material";
import {useColourMode} from "../hooks/useColourMode.ts";
import ActionButton from "./ui/button/action-button.tsx";
import Brightness7Icon from '@mui/icons-material/Brightness7';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import {
  Home,
  Package,
  Tags,
  Search,
  Settings,
  PanelLeftOpen,
  PanelLeftClose,
  PackageSearch, ChevronDown, ChevronUp,
} from "lucide-react";

const Layout = () => {
  const {mode, toggleMode} = useColourMode();
  const location = useLocation();

  const productRoutes = [
    "/products",
    "/products/categories",
    "/products/search",
  ];

  const isOnProductsRoute = productRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);


  const navMenu = [
    {to: '/', label: 'Home', icon: Home},
    {
      label: 'Products', // this is parent, no `to` the routes will be in submenu
      icon: Package,
      children: [
        {to: '/products', label: 'Product List', icon: PackageSearch},
        {to: '/products/categories', label: 'Product Categories', icon: Tags},
        {to: '/products/search', label: 'Search Products', icon: Search},
      ],
    },
    {to: '/settings', label: 'Settings', icon: Settings},
  ];

  useEffect(() => {
    setIsProductsOpen(isOnProductsRoute);
  }, [isOnProductsRoute]);

  useEffect(() => {
    setIsSidebarExpanded(false);
  }, [location.pathname]);

  return (
    <div className="h-screen w-full flex flex-col bg-justgo-green">
      <header className="flex justify-between items-center text-white p-1 h-12">
        <div className="flex w-fit gap-6 h-full justify-center items-center">
          <Tooltip title={isSidebarExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'} arrow placement={'right'}>
            <div
              onClick={() => setIsSidebarExpanded(value => !value)}
              className={cn(
                'w-12 h-10 flex items-center justify-center rounded-lg cursor-pointer flex-shrink-0',
                'hover:bg-justgo-purple transition-all'
              )}
            >
              {isSidebarExpanded ? (
                <PanelLeftClose/>
              ) : (
                <PanelLeftOpen/>
              )}
            </div>
          </Tooltip>
          <Link to="/">
            <h1 className="text-sm md:text-lg font-bold">JustGo International</h1>
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

      <div className={'flex-1 flex w-full h-full overflow-hidden px-1 md:pl-1 md:pr-2 relative'}>
        {/* Sidebar Overlay (mobile only) */}
        {isSidebarExpanded && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setIsSidebarExpanded(false)} // click to close
          />
        )}
        {/* Sidebar */}
        <div
          className={cn(
            'flex-col py-4 items-end justify-start gap-2 transition-all h-full duration-300 left-0 overflow-hidden flex-shrink-0 ',
            'flex fixed md:relative bg-justgo-blue md:bg-justgo-green z-50 md:z-0 rounded-r-md',
            isSidebarExpanded ? 'w-50' : 'w-0 md:w-12',
          )}
        >
          {navMenu.map(({to, label, icon: Icon, children}) => {

            if (children) {
              // Parent menu with submenu
              return (
                <div key={label} className="w-full">
                  <Tooltip title={isProductsOpen ? 'Click to collapse' : 'Click to expand'} placement="right" arrow>
                    <div
                      onClick={() => setIsProductsOpen(prev => !prev)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 h-8 cursor-pointer transition-all duration-300 rounded-l-md",
                        "hover:bg-justgo-purple text-white hover:text-white font-semibold"
                      )}
                    >
                      <Icon className="shrink-0"/>
                      {isSidebarExpanded && (
                        <>
                          <span className="text-sm font-medium">{label}</span>
                          {isProductsOpen
                            ? <ChevronUp className="w-5 h-5"/>
                            : <ChevronDown className="w-5 h-5"/>
                          }
                        </>
                      )}
                    </div>
                  </Tooltip>

                  {/* Submenu */}
                  {isProductsOpen && (
                    <div className="flex flex-col ml-1 mt-1 gap-2 bg-justgo-blue/50 rounded-l-md">
                      {children.map(({to, label, icon: SubIcon}) => (
                        <Tooltip key={to} title={label} placement="right" arrow>
                          <NavLink
                            key={to}
                            to={to}
                            className="flex w-full"
                            end
                          >
                            {({isActive}) => (
                              <div
                                className={cn(
                                  "flex items-center gap-3 px-3 py-3 transition-all w-full h-6 duration-300 rounded-l-md ",
                                  isActive
                                    ? 'bg-white dark:bg-neutral-500 dark:text-white text-justgo-green font-semibold hover:bg-justgo-blue hover:text-white'
                                    : 'hover:bg-justgo-purple text-white hover:text-white hover:font-semibold',
                                )}
                              >
                                <SubIcon className="shrink-0 w-5 h-5"/>
                                {isSidebarExpanded && (
                                  <span className="text-xs">{label}</span>
                                )}
                              </div>
                            )}
                          </NavLink>
                        </Tooltip>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Tooltip key={to} title={label} placement="right" arrow>
                <NavLink className={'flex w-full'} to={to} end>
                  {({isActive}) => (
                    <div
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 transition-all w-full h-8 duration-300 rounded-l-md ",
                        isActive
                          ? 'bg-white dark:bg-neutral-500 dark:text-white text-justgo-green font-semibold hover:bg-justgo-blue hover:text-white'
                          : 'hover:bg-justgo-purple text-white hover:text-white hover:font-semibold',
                      )}
                    >
                      <Icon className="shrink-0"/>
                      {isSidebarExpanded && (
                        <span className="text-sm font-medium">
                        {label}
                      </span>
                      )}
                    </div>
                  )}
                </NavLink>
              </Tooltip>
            )
          })}
        </div>

        <main className="flex-1 flex flex-col w-full min-h-0 overflow-hidden rounded-lg">
          <Outlet/>
        </main>
      </div>
      <footer className="text-gray-200 text-xs text-center items-center justify-center h-4 w-full">
        &copy; {new Date().getFullYear()} JustGo International. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
