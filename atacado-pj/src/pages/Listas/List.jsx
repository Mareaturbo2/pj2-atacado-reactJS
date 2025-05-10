import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CriarLista from '../../components/Lista/CriarLista';
import Assistente from '../../components/Lista/Assistente';
import BuscarLista from "./BuscarLista";
import ChatBot from '../Tacadinho/ChatBot';
import styles from './List.module.css';

export default function List() {
  const [mostrarChat, setMostrarChat] = useState(false);

  return (
    <main className={styles.container}>
      <CriarLista abrirChat={() => setMostrarChat(true)} />

      <Assistente onAbrirChat={() => setMostrarChat(true)} />
      <BuscarLista />
      <ChatBot isOpen={mostrarChat} setIsOpen={setMostrarChat} />
    </main>
  );
}
