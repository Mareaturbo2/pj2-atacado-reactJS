
import React, { useState, useEffect } from 'react';
import styles from './QuemSomos.module.css'
import Atacado1 from '../../assets/atacado1.jfif';
import Atacado2 from '../../assets/atacado2.jfif';
import Atacado4 from '../../assets/atacado4.jfif';
import Atacado5 from '../../assets/atacado5.jfif';

export default function QuemSomos() {
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
    <main>
      <section className={styles.linha}>
        
        <div className={styles.textoEsquerda}>
          <h2 className={styles.titulo}>
            Somos uma rede de <br />
            lojas genuinamente <br />
            pernambucana
          </h2>
          <p className={styles.subtitulo}>
            Oferecemos produtos de <br />
            qualidade com o melhor preço, <br />
            trazendo a tradição e <br />
            o compromisso com nossos <br />
            clientes em cada detalhe.
          </p>
        </div>

        
        <div className={styles.textoDireita}>
          <p className={styles.paragrafo}>
            O Atacado dos Presentes é reconhecido pela variedade, <br />
            preço justo e atendimento acolhedor. <br />
            Nossa missão é oferecer uma experiência de compra única, <br />
            unindo qualidade e confiança, <br />
            sempre com o toque regional que só nós sabemos proporcionar. <br />
            Estamos presentes no dia a dia dos pernambucanos, <br />
            trazendo produtos que fazem parte das suas histórias e celebrações.
          </p>
        </div>

      </section>
      <br />
      <br />
      <br />
      <br />

      <section className={styles.linha}>
        <div className={styles.textoEsquerda}>
          <h2 className={styles.titulo}>
          Estamos<br/> 
          Localizados<br/> 
          em toda RMR
          </h2>
        </div>

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

     
        <div className={styles.textoDireita}>
          <h2 className={styles.titulo}>
            Encontre <br/>
            unidade<br/>
            mais proxima

          </h2>
        </div>
        
      </section>
    </main>
  );
}