import { useNavigate } from 'react-router-dom';
import { obterListas, salvarListas } from '../../utils/listas';
import styles from './CriarLista.module.css';

export default function CriarLista() {
  const navigate = useNavigate();

  const gerarIdUnico = () => {
    return 'lista-' + Math.random().toString(36).substr(2, 9);
  };

  const criarLista = () => {
    const nome = prompt('Digite o nome da lista:');
    if (!nome) return;

    const descricao = prompt('Digite uma descrição (opcional):') || '';

    const novaLista = {
      id: gerarIdUnico(),
      nome,
      descricao,
      produtos: [],
    };

    const listas = obterListas();
    listas.push(novaLista);
    salvarListas(listas);

    navigate(`/lista/${novaLista.id}`);
  };

  return (
    <section className={styles['criar-lista']}>
      <h2>Crie listas personalizadas e compartilhe com quem quiser!</h2>
      <p>
        Escolha os itens desejados, personalize detalhes e compartilhe com amigos e familiares para
        facilitar a escolha do presente perfeito.
      </p>

      <div className={styles['buttons']}>
        <button className={styles['btn-green']} onClick={criarLista}>
          + Criar Lista
        </button>
        <button
          className={styles['btn-green']}
          onClick={() => navigate('/minhas-listas')}
        >
          📂 Minhas Listas
        </button>
      </div>

      <div className={styles['listas-criadas']}>
        <button className={styles['btn-lista']}>Lista de Casamento</button>
        <button className={styles['btn-lista']}>Lista de Aniversário</button>
        <button className={styles['btn-lista']}>Lista de Chá de Bebê</button>
        <button className={styles['btn-lista']}>Lista de Formatura</button>
      </div>
    </section>
  );
}
