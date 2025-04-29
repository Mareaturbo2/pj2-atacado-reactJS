import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home      from '../pages/Home/Home';
import List      from '../pages/Listas/List';
import Product   from '../pages/Produtos/Product';
import WhoWeAre  from '../pages/QuemSomos/WhoWeAre';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"            element={<Home />} />
      <Route path="/listas"      element={<List />} />
      <Route path="/produtos"    element={<Product />} />
      <Route path="/quem-somos"  element={<WhoWeAre />} />
      <Route path="*"            element={<Home />} />  {/* fallback */}
    </Routes>
  );
}
