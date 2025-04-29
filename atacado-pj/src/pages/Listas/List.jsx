import React, { useState } from 'react';
import CriarLista from '../../components/Lista/CriarLista';
import Assistente from '../../components/Lista/Assistente';
import BuscarLista from '../../components/Lista/BuscarLista';
import ChatBot from '../Tacadinho/ChatBot'; // ajuste conforme seu caminho
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
