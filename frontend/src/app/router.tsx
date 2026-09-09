import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { ProductPage } from '../pages/productPage';
import { ProductsPage } from '../pages/productsPage';
import { SuccessPage } from '../pages/successPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/produtos/:id" element={<ProductPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/sucesso" element={<SuccessPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
