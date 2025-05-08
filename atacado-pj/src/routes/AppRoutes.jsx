import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import List from '../pages/Listas/List';
import Product from '../pages/Produtos/Product';
import WhoWeAre from '../pages/QuemSomos/WhoWeAre';
import CafeMosteiro from '../pages/CafeMosteiro/CafeMosteiro';
import QuemSomos from '../pages/QuemSomos/QuemSomos';
import Login from '../pages/Login/Login';
import FaleConosco from '../pages/FaleConosco/FaleConosco';
import UserProfile from '../pages/UserProfile/UserProfile';
import Novidades from '../pages/Novidades/Novidades';

export default function AppRoutes({ abrirChat }) {
  return (
    <Routes>
      <Route path="/"            element={<Home abrirChat={abrirChat} />} />
      <Route path="/listas"      element={<List abrirChat={abrirChat} />} />
      <Route path="/produtos"    element={<Product abrirChat={abrirChat} />} />
      <Route path="/quem-somos"  element={<QuemSomos abrirChat={abrirChat} />} />
      <Route path="/cafemosteiro"  element={<CafeMosteiro abrirChat={abrirChat} />} />
      <Route path="*"            element={<Home abrirChat={abrirChat} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/fale-conosco" element={<FaleConosco />} />
      <Route path="/UserProfile" element={<UserProfile />} />
      <Route path="/novidades" element={<Novidades />} />
      
    </Routes>
  );
}
