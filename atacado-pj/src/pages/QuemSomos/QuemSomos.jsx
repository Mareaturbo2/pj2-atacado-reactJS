
import React, { useState, useEffect } from 'react';
import styles from './QuemSomos.module.css'
import Atacado1 from '../../assets/atacado1.jfif';
import Atacado2 from '../../assets/atacado2.jfif';
import Atacado4 from '../../assets/atacado4.jfif';
import Atacado5 from '../../assets/atacado5.jfif';
import cafe from '../../assets/cafemosteiro.jpg';
import bkverde from './assets/bckgrnd-verde.svg'
import bkvermelho from './assets/bckgrnd-vermelho.svg'
import bolv from './assets/Detalhe.svg'
import bolVerde from './assets/Detalhe-Bolas_verdes.svg'

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
      <section className={styles.linhaDois}>
        <img className={styles.imgCanto} src={bkverde} alt="" />
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

      <section className={styles.linha}>
        <div className={styles.textoEsquerda}>
          <h2 className={styles.tituloDois}>
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
          <h2 className={styles.tituloDois}>
            Encontre <br/>
            unidade<br/>
            mais proxima

          </h2>
        </div>
        
      </section>

      <section className={styles.linha}>
        <div className={styles.textoEsquerda}>
          <h2 className={styles.titulo}>
            Conheça tambem o <br/>
            Cafe Mosteiro
          </h2>
          <div className={styles['cafe-imagem']}>
          <img src={cafe} alt="Cafe Mosteiro" />
          <p className={styles['subtitulo-cafe']}>
            Um ambiente acolhedor e único, onde você
            pode <br/>
            saborear delicias que complentam
            essa experiência
          </p>
          </div>
        </div>


        <section className={styles.linhaTres}>
        <div className={styles.textoDireita}>
        <p className={styles.paragrafo}>
          Seja no site ou na loja, nossa <br/>
          missão é oferecer a<br/>
          conveniência de encontrar<br/>
          tudo o que você precisa em um<br/>
          só lugar, com qualidade, preço justo<br/>
          e o atendimento que você merece
       </p>
        </div>
          <img className={styles.imgCantoDir} 
          src={bkvermelho} 
          alt="Detalhe decorativo" />
       </section>
      </section>



      
    </main>
  );
}