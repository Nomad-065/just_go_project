import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/home/HomePage.tsx";
import ProductsPage from "./pages/products/ProductsPage.tsx";
import Layout from "./components/layout.tsx";


const App = () => {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/products" element={<ProductsPage/>}/>
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
