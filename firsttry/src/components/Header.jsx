import styles from './Header.module.css'
import LogoCMYK from "../assets/Logo CMYK - Atacado dos Presentes - Horizontal 1.svg";
export function Header() {
    return (
      <header className={styles['top-header']}>
        <div className={styles['top-content']}>
          <div className={styles.buttons}>
            <button className={styles['btn-green']}>Meu Perfil</button>
            <button className={styles['btn-red']}>Fale Conosco</button>
          </div>
  
          <nav className={styles['nav-menu']}>
            <a href="#">Home</a>
            <a href="quemsomos.html">Quem Somos</a>
            <a href="#">Produtos</a>
            <a href="listas.html">Listas</a>
          </nav>
  
          <div className={styles.logo}>
            <img
              src={LogoCMYK}
              alt="Logo Atacado dos Presentes"
            />
          </div>
        </div>
      </header>
    );
  }
  