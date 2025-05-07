import React from 'react';
import styles from './UserProfile.module.css';
import avatar from '../../assets/avatar.png';

export default function UserProfile() {
  return (
    <div className={styles['perfil-container']}>
      <div className={styles['perfil-box']}>
        <img className={styles['perfil-avatar']} src={avatar} alt="Avatar" />
        <div className={styles['perfil-buttons']}>
          <button className={styles.editar}>Editar</button>
          <button className={styles.sair}>Sair</button>
        </div>

        <div className={styles['perfil-info']}>
          <p className={styles.info}>Nome de usuário</p>
          <p className={styles.info}>Endereço de entrega</p>
          <p className={styles.info}>(xx) xxxx-xxxx</p>
        </div>
      </div>

      <div className={styles['perfil-menu']}>
        <div className={styles.item}>
          <span>Informações de identidade</span>
          <span className={styles.verificado}>verificado &gt;</span>
        </div>
        <div className={styles.item}>Métodos de pagamento &gt;</div>
        <div className={styles.item}>Comprar novamente &gt;</div>
        <div className={styles.item}>À caminho &gt;</div>
        <div className={styles.item}>Cupons &gt;</div>
        <div className={styles.item}>Central de ajuda &gt;</div>
      </div>
    </div>
  );
}
