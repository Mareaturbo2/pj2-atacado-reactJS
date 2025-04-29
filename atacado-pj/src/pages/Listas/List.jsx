import CriarLista from '../../components/Lista/CriarLista';
import Assistente from '../../components/Lista/Assistente'
import BuscarLista from '../../components/Lista/BuscarLista'
import styles from './List.module.css'

export default function List() {
  return (
    <>
      
      <main className={styles.container}>
        <CriarLista />
        <Assistente />
        <BuscarLista />
      </main>
      
    </>
  );
}
