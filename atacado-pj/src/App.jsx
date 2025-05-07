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
  <div className="app-container">
    <Header />
    <div className="content">
      <AppRoutes abrirChat={() => setMostrarChat(true)} />
    </div>
    <Footer />
    <ChatBot isOpen={mostrarChat} setIsOpen={setMostrarChat} />
  </div>
</BrowserRouter>
  );
}
