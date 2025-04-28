import styles from './Header.module.css'
import LogoCMYK from '../assets/LogoCMYK.svg'
export function Header(){

    return(
        <header className={styles.header}>
        <div className={styles.topcontent}>
        <div className={styles.buttons}>
        <button type='submit' className={styles.btngreen}>Meu Perfil</button>
        <button type='submit' className={styles.btnred}>Fale Conosco</button>
        </div>
        <nav className={styles.navmenu}>
            <a href="#">Home</a>
            <a href="quemsomos.html">Quem Somos</a>
            <a href="#">Produtos</a>
            <a href="listas.html">Listas</a>
          </nav>
          <div className={styles.logo}>
            <img src={LogoCMYK} 
            alt="Logo do atacado dos Presentes" />

          </div>
          
        </div>
      </header>
    )
}