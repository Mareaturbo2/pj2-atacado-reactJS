import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import LogoCMYK from '../../assets/LogoCMYK.svg';
import { useCarrinho } from '../../Carrinho/Carrinho';

export default function Header() {
  const { carrinho } = useCarrinho();

  return (
    <header className={styles.header}>
      <div className={styles.topcontent}>
        <div className={styles.buttons}>
          <NavLink to="/login" className={styles.btngreen}>Meu Perfil</NavLink>
          <NavLink to="/fale-conosco" className={styles.btnred}>Fale Conosco</NavLink>
          <NavLink to="/carrinho" className={styles.btngreen}>
            🛒 Carrinho ({carrinho.length})
          </NavLink>
        </div>
        <nav className={styles.navmenu}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/quem-somos">Quem Somos</NavLink>
          <NavLink to="/produtos">Produtos</NavLink>
          <NavLink to="/listas">Listas</NavLink>
          <NavLink to="/cafemosteiro">Cafe Mosteiro</NavLink>
        </nav>
        <div className={styles.logo}>
          <img src={LogoCMYK} alt="Logo Atacado dos Presentes" />
        </div>
      </div>
    </header>
  );
}
