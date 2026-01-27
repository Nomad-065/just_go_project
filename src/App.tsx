import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/home/HomePage.tsx";
import ProductListPage from "./pages/products/list/ProductListPage.tsx";
import Layout from "./components/layout.tsx";
import ProductCategoryPage from "./pages/products/categories/ProductCategoryPage.tsx";
import ProductSearchPage from "./pages/products/search/ProductSearchPage.tsx";
import SettingsPage from "./pages/settings/SettingsPage.tsx";
import ProductDetailsPage from "./pages/products/ProductPage.tsx";


const App = () => {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/products" element={<ProductListPage/>}/>
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/products/categories" element={<ProductCategoryPage/>}/>
        <Route path="/products/search" element={<ProductSearchPage/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={<div className="p-8 text-center text-2xl">Page Not Found</div>}
      />
    </Routes>
  );
};


export default App
