import React, { useEffect, useState } from 'react';
import styles from './Produtos.module.css';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const produtosMock = [
  { id: 1, nome: 'Pote Hermético', preco: 'R$ 24,90', imagem: '/images/pote1.png' },
  { id: 2, nome: 'Organizador Multiuso', preco: 'R$ 34,90', imagem: '/images/pote2.png' },
  { id: 3, nome: 'Panela Antiaderente', preco: 'R$ 89,90', imagem: '/images/panela.png' },
  { id: 4, nome: 'Conjunto de Potes', preco: 'R$ 49,90', imagem: '/images/pote3.png' },
  { id: 5, nome: 'Escorredor de Louça', preco: 'R$ 39,90', imagem: '/images/escorredor.png' },
  { id: 6, nome: 'Jogo de Facas', preco: 'R$ 59,90', imagem: '/images/facas.png' },
  { id: 7, nome: 'Tábua de Corte', preco: 'R$ 19,90', imagem: '/images/tabua.png' },
  { id: 8, nome: 'Frigideira Inox', preco: 'R$ 79,90', imagem: '/images/frigideira.png' },
];

const slugMap = {
  1: 'pote-hermetico',
  2: 'organizador-multiuso',
  3: 'panela-antiaderente',
  4: 'conjunto-de-potes',
  5: 'escorredor-de-louca',
  6: 'jogo-de-facas',
  7: 'tabua-de-corte',
  8: 'frigideira-inox',
};

export default function Produtos() {
  const [busca, setBusca] = useState('');
  const [vistos, setVistos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const salvos = localStorage.getItem('vistos');
    if (salvos) setVistos(JSON.parse(salvos));
  }, []);

  const handleClickProduto = (produto) => {
    const atualizados = [produto, ...vistos.filter(p => p.id !== produto.id)].slice(0, 5);
    setVistos(atualizados);
    localStorage.setItem('vistos', JSON.stringify(atualizados));

    const slug = slugMap[produto.id];
    if (slug) {
      navigate(`/produto/${slug}`);
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.banner}>
        <div className={styles.bannerLeft}>
          <div className={styles.vermelho}>
            Encontre os melhores produtos<br />para montar a sua cozinha.
          </div>
        </div>
        <img src="/images/banner-cozinha.png" alt="Cozinha com potes" className={styles.bannerImage} />
      </section>

      <div className={styles.headerSection}>
        <h1>Tudo num só lugar.</h1>

        <div className={styles.searchBar}>
          <FaSearch className={styles.icon} />
          <input
            type="text"
            placeholder="Buscar produto ou categoria"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className={styles.buttons}>
          <button onClick={() => navigate('/novidades')} className={styles['btn-outline-green']}>
            Novidades
          </button>
          <button onClick={() => navigate('/descontos')} className={styles['btn-outline-red']}>
            Descontos
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {produtosMock
          .filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()))
          .map(produto => (
            <div key={produto.id} className={styles.card} onClick={() => handleClickProduto(produto)}>
              <img src={produto.imagem} alt={produto.nome} />
              <p>{produto.nome}</p>
              <span>{produto.preco}</span>
            </div>
        ))}
      </div>

      {vistos.length > 0 && (
        <div className={styles.vistos}>
          <h2>Vistos recentemente</h2>
          <div className={styles.carousel}>
            <button className={styles.navButton} onClick={() => {
              const ultimo = vistos[vistos.length - 1];
              const restantes = vistos.slice(0, -1);
              setVistos([ultimo, ...restantes]);
              localStorage.setItem('vistos', JSON.stringify([ultimo, ...restantes]));
            }}>
              <FaChevronLeft />
            </button>

            <div className={styles.items}>
              {vistos.map((produto, index) => (
                <div key={index} className={styles.cardVisto}>
                  <img src={produto.imagem} alt={produto.nome} />
                  <p>{produto.nome}</p>
                </div>
              ))}
            </div>

            <button className={styles.navButton} onClick={() => {
              const primeiro = vistos[0];
              const restantes = vistos.slice(1);
              setVistos([...restantes, primeiro]);
              localStorage.setItem('vistos', JSON.stringify([...restantes, primeiro]));
            }}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
