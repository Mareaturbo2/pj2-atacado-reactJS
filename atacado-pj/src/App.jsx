import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header     from './components/Header/Header';
import AppRoutes  from './routes/AppRoutes';
import Footer     from './components/Footer/Footer';
import './global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}