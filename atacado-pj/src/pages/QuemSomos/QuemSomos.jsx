import React from 'react';
import styles from './QuemSomos.module.css'

export default function QuemSomos() {
  return (
    <main>
      <section className={styles.linha}>
        
        {/* Coluna da esquerda */}
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

        {/* Coluna da direita */}
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
    </main>
  );
}