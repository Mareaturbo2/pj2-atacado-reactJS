import React, { useState, useEffect } from 'react';
import styles from './CafeMosteiro.module.css';
import img1 from '../../assets/1.jpg';
import img2 from '../../assets/2.jpg';
import img3 from '../../assets/3.jpg';
import img4 from '../../assets/4.jpg';
import img5 from '../../assets/5.jpg';

export default function CafeMosteiro() {
  const imagens = [img1, img2, img3,img4,img5];
  const [index, setIndex] = useState(0);

  const voltar = () => {
    setIndex((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));
  };

  const avancar = () => {
    setIndex((prev) => (prev + 1) % imagens.length);
  };

  useEffect(() => {
    const interval = setInterval(avancar, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Café Mosteiro</h1>
      <h2 className={styles.subtitle}>O tradicional café espresso</h2>

      <div className={styles.greenBar}></div>

      <div className={styles.carouselWrapper}>
        <button className={`${styles.carouselBtn} ${styles.prev}`} onClick={voltar}>
          ❮
        </button>
        <div className={styles.carousel}>
          <img src={imagens[index]} alt={`Imagem ${index + 1}`} />
        </div>
        <button className={`${styles.carouselBtn} ${styles.next}`} onClick={avancar}>
          ❯
        </button>
      </div>

      <div className={styles.greenBar}></div>

      <section className={styles.description}>
        <h2>Venha nos Conhecer</h2>
        <p>
          O ambiente perfeito para um momento de descanso entre as compras. Cardápio variado em doces, bolos, sucos e salgados.
        </p>
        <p>
          Estamos presentes nas seguintes filiais do Atacado dos Presentes: Curado, Torre, Boa Vista e Imbiribeira.
        </p>
        <a
          href="/pdfs/cardapio.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardapioButton}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" width="20" height="20" fill="red">
            <path d="M6 2C4.89 2 4 .89 4 2v20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM8 13h8v2H8v-2zm0 4h5v2H8v-2z"/>
          </svg>
          <span>Ver Cardápio</span>
        </a>
      </section>

      <div className={styles.footerBar}></div>
    </main>
  );
}
