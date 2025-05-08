import React, { useState } from 'react';
import styles from './Novidades.module.css';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const imagens = [
  { src: '/images/agendas.png', label: 'Agendas' },
  { src: '/images/limpeza.png', label: 'Limpeza' },
  { src: '/images/tinturas.png', label: 'Tinturas' },
  { src: '/images/ferramentas.png', label: 'Ferramentas' },
];

export default function Novidades() {
  const [items, setItems] = useState(imagens);

  const scrollRight = () => {
    const first = items[0];
    const rest = items.slice(1);
    setItems([...rest, first]); 
  };

  const scrollLeft = () => {
    const last = items[items.length - 1];
    const rest = items.slice(0, items.length - 1);
    setItems([last, ...rest]); 
  };

  return (
    <main className={styles.container}>
      <h1>As novidades da semana estão aqui!</h1>

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
        <button className={styles.navButton} onClick={scrollLeft}>
          <FaChevronLeft />
        </button>

        <div className={styles.items}>
          {items.map((item, index) => (
            <div className={styles.item} key={index}>
              <img src={item.src} alt={item.label} />
              <p>{item.label}</p>
            </div>
          ))}
        </div>

        <button className={styles.navButton} onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
    </main>
  );
}
