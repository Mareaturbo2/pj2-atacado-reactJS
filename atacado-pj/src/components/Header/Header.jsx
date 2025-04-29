import React from 'react';
import { NavLink } from 'react-router-dom';
import styles      from './Header.module.css';
import LogoCMYK    from '../../assets/LogoCMYK.svg';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.topcontent}>
        <div className={styles.buttons}>
          <button className={styles.btngreen}>Meu Perfil</button>
          <button className={styles.btnred}  >Fale Conosco</button>
        </div>
        <nav className={styles.navmenu}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/quem-somos">Quem Somos</NavLink>
          <NavLink to="/produtos">Produtos</NavLink>
          <NavLink to="/listas">Listas</NavLink>
        </nav>
        <div className={styles.logo}>
          <img src={LogoCMYK} alt="Logo Atacado dos Presentes" />
        </div>
      </div>
    </header>
  );
}