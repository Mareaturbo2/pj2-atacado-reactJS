import styles from './BuscarLista.module.css'

export default function BuscarLista() {
  return (
    <section className={styles['buscar-lista']}>
      <h2>Precisa encontrar uma lista de presentes?</h2>
      <p>Basta inserir o ID da lista de presente e nós te ajudamos a escolher o presente ideal! Veja as opções disponíveis, descubra os itens mais desejados e acerte em cheio na escolha para seu presente.</p>
      <div className={styles['buscar-barra']}>
        <input type="text" placeholder="Digite o ID da lista" />
        <button className={styles['btn-green']}>Buscar Lista</button>
      </div>
    </section>
  );
}
