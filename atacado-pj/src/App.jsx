import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/Footer/Footer';
import ChatBot from "./pages/Tacadinho/ChatBot";
import './global.css';

export default function App() {
  const [mostrarChat, setMostrarChat] = useState(false);

  return (
    <BrowserRouter>
      <Header />
      <AppRoutes abrirChat={() => setMostrarChat(true)} />
      <Footer />
      <ChatBot isOpen={mostrarChat} setIsOpen={setMostrarChat} />
    </BrowserRouter>
  );
}
