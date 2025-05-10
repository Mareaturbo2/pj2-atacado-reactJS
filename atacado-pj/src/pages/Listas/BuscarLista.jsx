import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obterListas } from '../../utils/listas';
import styles from './BuscarLista.module.css';

export default function BuscarLista() {
  const [busca, setBusca] = useState('');
  const navigate = useNavigate();

  const handleBuscar = () => {
    console.log('🔍 Buscando por:', busca);
    const listas = obterListas();
    const termo = busca.trim().toLowerCase().replace(/^#/, '');

    const encontrada = listas.find(
      (lista) =>
        lista.id.toLowerCase() === termo ||
        lista.nome?.toLowerCase() === termo
        );

    if (encontrada) {
      console.log('✅ Lista encontrada:', encontrada);
      navigate(`/lista/${encontrada.id}`);
    } else {
      console.warn('❌ Lista não encontrada');
      alert('Lista não encontrada. Verifique o ID ou nome.');
    }
  };

  return (
    <section className={styles['buscar-lista']}>
      <h2>Precisa encontrar uma lista de presentes?</h2>
      <p>
        Basta inserir o ID da lista de presente e nós te ajudamos a escolher o
        presente ideal! Veja as opções disponíveis, descubra os itens mais
        desejados e acerte em cheio na escolha para seu presente.
      </p>
      <div className={styles['buscar-barra']}>
        <input
          type="text"
          placeholder="Digite o ID da lista"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button className={styles['btn-green']} onClick={handleBuscar}>
          Buscar Lista
        </button>
      </div>
    </section>
  );
}
