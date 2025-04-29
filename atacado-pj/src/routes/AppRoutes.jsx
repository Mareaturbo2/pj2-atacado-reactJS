import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import List from '../pages/Listas/List';
import Product from '../pages/Produtos/Product';
import WhoWeAre from '../pages/QuemSomos/WhoWeAre';

export default function AppRoutes({ abrirChat }) {
  return (
    <Routes>
      <Route path="/"            element={<Home abrirChat={abrirChat} />} />
      <Route path="/listas"      element={<List abrirChat={abrirChat} />} />
      <Route path="/produtos"    element={<Product abrirChat={abrirChat} />} />
      <Route path="/quem-somos"  element={<WhoWeAre abrirChat={abrirChat} />} />
      <Route path="*"            element={<Home abrirChat={abrirChat} />} />
    </Routes>
  );
}
