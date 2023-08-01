import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import ProductsDetailsPage from "./pages/ProductDetailsPage";
import Layout from "./components/Layout/Layout";
import { useSelector } from "react-redux";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import CartPage from "./pages/CartPage";

function App() {
  const state = useSelector((state) => state);

  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductsPage />} exact />
          <Route path="/products/:title" element={<ProductsDetailsPage state={state}/>} />
          <Route path="/cart" element={<CartPage state={state}/>} />
          <Route path="/checkout" element={<CheckoutPage state={state}/>} />
          <Route path="/order-success" element={<OrderSuccessPage/>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
