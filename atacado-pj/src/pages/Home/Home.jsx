import React from 'react';
import styles from './Home.module.css';

export default function Home() {
  return (
    <main className={styles['home-container']}>
      <section className={styles.hero}>
        <div className={styles['hero-image']}>
          <img src="/images/hero-img.png" alt="Mulher usando celular" />
        </div>
        <div className={styles['hero-text']}>
          <h1>
            A loja que você ama está de <br />
            cara nova e agora na <br />
            palma da sua mão.
          </h1>
          <p>
            Atacado dos Presentes: a mesma confiança de sempre, agora com uma nova experiência.
          </p>
          <div className={styles['hero-buttons']}>
            <button className={styles['btn-outline-green']}>Novidades</button>
            <button className={styles['btn-outline-red']}>Descontos</button>
          </div>
        </div>
      </section>

      <section className={styles.steps}>
        <div className={styles.step}>
          <img src="/images/step1.png" alt="Conheça o nosso site" />
          <p>Conheça o nosso site.</p>
        </div>
        <div className={styles.step}>
          <img src="/images/step2.png" alt="Descubra nossas lojas" />
          <p>Descubra nossas lojas.</p>
        </div>
        <div className={styles.step}>
          <img src="/images/step3.png" alt="Ofertas exclusivas" />
          <p>Encontre ofertas exclusivas.</p>
        </div>
        <div className={styles.step}>
          <img src="/images/step4.png" alt="Compre com comodidade" />
          <p>Compre com comodidade.</p>
        </div>
      </section>

      <section className={styles.highlights}>
        <div className={styles.highlight}>
          <h2>Novidades da semana</h2>
          <img src="/images/novidades.png" alt="Novidades" />
          <p>Confira os produtos que acabaram de chegar em nosso site!</p>
        </div>
        <div className={styles.highlight}>
          <h2>Top avaliações</h2>
          <img src="/images/top-avaliacoes.png" alt="Top Avaliações" />
          <p>Descubra os produtos mais bem avaliados por nossos clientes!</p>
        </div>
      </section>
    </main>
  );
}
