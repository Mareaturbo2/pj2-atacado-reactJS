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
import Desconto from '../pages/Desconto/Desconto';
import ProdutoDetalhado from '../pages/Produtos/ProdutoDetalhado';
import Carrinho from '../pages/Carrinho/Carrinho';
import VisualizarLista from '../pages/Listas/VisualizarLista';
import MinhasListas from '../pages/Listas/MinhasListas';
import Pedido from '../pages/Pedido/Pedido';
import MeusPedidos from '../pages/MeusPedidos/MeusPedidos';
import PedidoDetalhado from "../pages/MeusPedidos/PedidoDetalhado";


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
      <Route path="/descontos" element={<Desconto />} />
      <Route path="/produto/:slug" element={<ProdutoDetalhado />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/lista/:id" element={<VisualizarLista />} />
      <Route path="/minhas-listas" element={<MinhasListas />} />
      <Route path="/pedido" element={<Pedido />} />
      <Route path="/meus-pedidos" element={<MeusPedidos />} />
      <Route path="/pedido/:id" element={<PedidoDetalhado />} />

    
      
    </Routes>
  );
}
