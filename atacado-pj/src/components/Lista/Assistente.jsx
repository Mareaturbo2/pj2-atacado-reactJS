import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles    from './Assistente.module.css';
import Tacadinho from '../../assets/Tacadinho.png';

export default function Assistente() {
  const navigate = useNavigate();

  return (
    <section className={styles['assistente-section']}>
      <div className={styles['assistente-content']}>
        <div className={styles['assistente-imagem']}>
          <img src={Tacadinho} alt="Tacadinho" />
        </div>
        <div className={styles['assistente-texto']}>
          <h2>Tacadinho: Seu Assistente de Compras</h2>
          <p>Descubra nosso assistente Tacadinho, pronto para ajudar você a escolher os melhores presentes e montar sua lista com facilidade.</p>
          <button
            className={styles['btn-tacadinho']}
            onClick={() => navigate('/chat-bot')}
          >
            Fale com o Tacadinho
          </button>
        </div>
      </div>
    </section>
  );
}