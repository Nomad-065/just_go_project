import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/home/HomePage.tsx";
import ProductListPage from "./pages/products/list/ProductListPage.tsx";
import Layout from "./components/layout.tsx";
import ProductCategoryPage from "./pages/products/categories/ProductCategoryPage.tsx";
import ProductSearchPage from "./pages/products/search/ProductSearchPage.tsx";
import SettingsPage from "./pages/settings/SettingsPage.tsx";
import ProductDetailsPage from "./pages/products/ProductDetailsPage.tsx";
import DealsPage from "./pages/deals/DealsPage.tsx";
import CustomIDsPage from "./pages/custom-ids/CustomIDsPage.tsx";
import ProgrammesPage from "./pages/programmes/ProgrammesPage.tsx";
import AssetsPage from "./pages/assets/AssetsPage.tsx";
import ReportsSharingPage from "./pages/reports/ReportsSharingPage.tsx";
import ReportsHistoryPage from "./pages/reports/ReportsHistoryPage.tsx";
import ExchangeRatesPage from "./pages/rates/ExchangeRatesPage.tsx";
import DFPRatesPage from "./pages/rates/DFPRates.tsx";
import FacebookPagesPage from "./pages/facebook-pages/FacebookPagesPage.tsx";


const App = () => {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/products" element={<ProductListPage/>}/>
        <Route path="/products/:id" element={<ProductDetailsPage/>}/>
        <Route path="/products/categories" element={<ProductCategoryPage/>}/>
        <Route path="/products/search" element={<ProductSearchPage/>}/>

        <Route path="/deals" element={<DealsPage/>}/>
        <Route path="/custom-ids" element={<CustomIDsPage/>}/>
        <Route path="/programmes" element={<ProgrammesPage/>}/>
        <Route path="/assets" element={<AssetsPage/>}/>

        <Route path="/reports/sharing" element={<ReportsSharingPage/>}/>
        <Route path="/reports/history" element={<ReportsHistoryPage/>}/>

        <Route path="/rates/exchange" element={<ExchangeRatesPage/>}/>
        <Route path="/rates/dfp" element={<DFPRatesPage/>}/>

        <Route path="/facebook-pages" element={<FacebookPagesPage/>}/>

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
