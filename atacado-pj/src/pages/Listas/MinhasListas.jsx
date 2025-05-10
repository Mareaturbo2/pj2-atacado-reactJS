import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obterListas } from '../../utils/listas';
import styles from './MinhasListas.module.css';

export default function MinhasListas() {
  const [listas, setListas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setListas(obterListas());
  }, []);

  const excluirLista = (id) => {
    const confirmar = window.confirm('Deseja realmente excluir esta lista?');
    if (!confirmar) return;

    const novasListas = listas.filter((l) => l.id !== id);
    localStorage.setItem('listas', JSON.stringify(novasListas));
    setListas(novasListas);
  };

  return (
    <div className={styles.container}>
      <h1>Minhas Listas</h1>

      {listas.length === 0 ? (
        <p>Você ainda não criou nenhuma lista.</p>
      ) : (
        <div className={styles.grid}>
          {listas.map((lista) => (
            <div key={lista.id} className={styles.card}>
              <div className={styles.cardInterno}>
                {lista.produtos.length > 0 && (
                  <img
                    src={lista.produtos[0].imagem}
                    alt={lista.produtos[0].nome}
                    className={styles.imagemProduto}
                  />
                )}
                <div className={styles.info}>
                  <div className={styles.detalhes}>
                    <h2>{lista.nome}</h2>
                    <p>ID: {lista.id}</p>
                    <p>{lista.produtos.length} produto(s)</p>
                  </div>
                  <div className={styles.botoes}>
                    <button
                      className={styles['btn-outline-green']}
                      onClick={() => navigate(`/lista/${lista.id}`)}
                    >
                      Visualizar
                    </button>
                    <button
                      className={styles['btn-outline-red']}
                      onClick={() => excluirLista(lista.id)}
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
