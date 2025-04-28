import { useState, useEffect } from 'react';
import styles from './WhoWeAre.module.css';
import Atacado1 from '../assets/Atacado1.jfif';
import Atacado2 from '../assets/atacado2.jfif';
import Atacado4 from '../assets/atacado4.jfif';
import Atacado5 from '../assets/atacado5.jfif';
import cafe from '../assets/cafemosteiro.jpg';

export function WhoWeAre() {
  const images = [Atacado1, Atacado2, Atacado4, Atacado5];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className={styles.container}>
      <section> 
        <div className={styles['intro-text']}>
          <h1 className={styles['main-title']}>Somos uma rede de lojas genuinamente pernambucana</h1>
          <p>Oferecemos produtos de qualidade com o melhor preço, trazendo a tradição e o compromisso com nossos clientes em cada detalhe.</p>
        </div>
        <div className={styles['highlight-box']}>
          <p>O Atacado dos Presentes é reconhecido pela variedade, preço justo e atendimento acolhedor. 
            Nossa missão é oferecer uma experiência de compra única, unindo qualidade e confiança, 
            sempre com o toque regional que só nós sabemos proporcionar. Estamos presentes no dia a dia dos pernambucanos, 
            trazendo produtos que fazem parte das suas histórias e celebrações.
          </p>
          <p>Seja no site ou na loja, nossa missão é oferecer a conveniência de encontrar tudo o que você precisa em um só lugar, 
            com qualidade, preço justo e o atendimento que você merece.
          </p>
        </div>
      </section>

      <section className={styles.unidades}>
        <h2 className={styles['unidades-horizontal']}>Estamos em toda RMR</h2>
        <div className={styles['carousel-wrapper']}>
        <button className={`${styles['carousel-btn']} ${styles.prev}`} onClick={prevSlide}>
          ❮
        </button>

          <div className={styles.carousel}>
            <img
              src={images[currentIndex]}
              alt={`Unidade ${currentIndex + 1}`}
            />
          </div>
          <button className={`${styles['carousel-btn']} ${styles.next}`} onClick={nextSlide}>
          ❯
        </button>
        </div>
        <div className={styles.encontre}>
            <h2>Encontre sua unidade mais próxima</h2>
        </div>
      </section>

      <section className={styles.cafe}>
        <div className={styles['cafe-content']}>
            <div className={styles['cafe-imagem']}>
                <img src={cafe} alt="Cafe Mosteiro" />
            </div>
            <div className={styles['cafe-texto']}>
            <h2>Café Mosteiro</h2>
            <p>Descubra um espaço de acolhimento e sabores exclusivos, complementando sua experiência de compras conosco.</p>
            </div>
        </div>

      </section>

    </main>
    

    
  );
}

