import { useNavigate } from 'react-router-dom';
import { obterListas, salvarListas } from '../../utils/listas';
import styles from './CriarLista.module.css';

import imgCasaNova from '../../assets/modelo_casa nova 1.png';
import imgAniversario from '../../assets/modelo-aniversario 1.png';
import imgCasamento from '../../assets/modelo_casamento 1.png';
import imgBebe from '../../assets/chádebebe 1.png';

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

      <h3 style={{ marginTop: '2rem', fontWeight: 'bold' }}>Modelos populares:</h3>

      <div className={styles['galeriaModelos']}>
        <img src={imgCasamento} alt="Modelo Casamento" />
        <img src={imgAniversario} alt="Modelo Aniversário" />
        <img src={imgBebe} alt="Modelo Chá de Bebê" />
        <img src={imgCasaNova} alt="Modelo Casa Nova" />
      </div>
    </section>
  );
}
