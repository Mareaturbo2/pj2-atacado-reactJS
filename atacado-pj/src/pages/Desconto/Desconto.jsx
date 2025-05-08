import React, { useState } from 'react';
import styles from './Desconto.module.css';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const descontos = [
  { percent: '5%', cor: 'vermelho', texto: 'Em Papelaria' },
  { percent: '10%', cor: 'verde', texto: 'Em Utensílios' },
  { percent: '20%', cor: 'vermelho', texto: 'Em Brinquedos' },
  { percent: '15%', cor: 'verde', texto: 'Em Jardinagem' },
];

export default function Desconto() {
  const [itens, setItens] = useState(descontos);

  const moverDireita = () => {
    const primeiro = itens[0];
    setItens([...itens.slice(1), primeiro]);
  };

  const moverEsquerda = () => {
    const ultimo = itens[itens.length - 1];
    setItens([ultimo, ...itens.slice(0, -1)]);
  };

  return (
    <main className={styles.container}>
      <h1>Ofertas Exclusivas</h1>
      <p className={styles.subtitulo}>Selecionamos produtos com descontos especiais para você!</p>

      <div className={styles.searchSection}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar produto ou categoria"
            className={styles.searchInput}
          />
        </div>
        <button className={styles.moreProducts}>Mais produtos</button>
      </div>

      <div className={styles.carousel}>
        <button className={styles.navButton} onClick={moverEsquerda}>
          <FaChevronLeft />
        </button>

        <div className={styles.items}>
          {itens.map((item, idx) => (
            <div className={styles.item} key={idx}>
              <div className={`${styles.card} ${styles[item.cor]}`}>
                <span className={styles.percent}>{item.percent}</span>
                <span className={styles.off}>Off</span>
              </div>
              <p className={styles.label}>{item.texto}</p>
            </div>
          ))}
        </div>

        <button className={styles.navButton} onClick={moverDireita}>
          <FaChevronRight />
        </button>
      </div>
    </main>
  );
}
