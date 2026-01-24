import {Outlet, Link} from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header */}
      <header className="bg-indigo-600 text-white px-6 py-4 shadow-md">
        <nav className="flex w-full justify-between items-center">
          <Link to="/">
            <h1 className="text-lg font-bold">Online Warehouse</h1>
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/products" className="hover:underline">
              Products
            </Link>

          </div>
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-1 flex flex-col w-full min-h-0 overflow-hidden">
        <Outlet/>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-700 text-center py-4 mt-auto w-full">
        &copy; {new Date().getFullYear()} Online Warehouse. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
