import React from 'react';
import styles from './ProdutoDetalhado.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../../Carrinho/Carrinho'; 
import { adicionarProdutoNaLista, obterUltimaListaCriada } from '../../utils/listas';

const produtos = {
  'pote-hermetico': {
    nome: 'Pote Hermético',
    preco: 'R$ 24,90',
    imagem: '/images/pote1.png',
  },
  'organizador-multiuso': {
    nome: 'Organizador Multiuso',
    preco: 'R$ 34,90',
    imagem: '/images/pote2.png',
  },
  'panela-antiaderente': {
    nome: 'Panela Antiaderente',
    preco: 'R$ 89,90',
    imagem: '/images/panela.png',
  },
  'conjunto-de-potes': {
    nome: 'Conjunto de Potes',
    preco: 'R$ 49,90',
    imagem: '/images/pote3.png',
  },
  'escorredor-de-louca': {
    nome: 'Escorredor de Louça',
    preco: 'R$ 39,90',
    imagem: '/images/escorredor.png',
  },
  'jogo-de-facas': {
    nome: 'Jogo de Facas',
    preco: 'R$ 59,90',
    imagem: '/images/facas.png',
  },
  'tabua-de-corte': {
    nome: 'Tábua de Corte',
    preco: 'R$ 19,90',
    imagem: '/images/tabua.png',
  },
  'frigideira-inox': {
    nome: 'Frigideira Inox',
    preco: 'R$ 79,90',
    imagem: '/images/frigideira.png',
  },
  'modelo-wood': {
    nome: 'Modelo Wood - (03) Und –Marca Etc',
    preco: 'R$ 25,00',
    imagem: '/images/talheres-madeira.jpg',
  },
};

export default function ProdutoDetalhado() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { adicionarAoCarrinho } = useCarrinho(); 
  const produto = produtos[slug];

  if (!produto) return <p>Produto não encontrado.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.arrow} onClick={() => navigate('/produtos')}>&laquo;</div>

        <div className={styles.left}>
          <img src={produto.imagem} alt={produto.nome} />
          <p className={styles.nome}>{produto.nome}</p>
          <span className={styles.preco}>{produto.preco}</span>
        </div>

        <div className={styles.right}>
          <div className={styles.infoSection}>
            <button className={styles.infoButton}>Informações sobre o produto ▸</button>
            <button className={styles.infoButton}>Métodos de pagamento ▸</button>
            <button className={styles.infoButton}>Informações de entrega ▸</button>
            <button className={styles.infoButton}>Quantidade solicitada ▸</button>
          </div>

          <div className={styles.actions}>
            <button
  className={styles['btn-outline-green']}
  onClick={() => {
    adicionarAoCarrinho({ id: slug, ...produto });
    navigate('/carrinho');
  }}
>
  Comprar Agora
</button>
            
            
            <button
              className={styles['btn-outline-red']}
              onClick={() => {
                const ultimaLista = obterUltimaListaCriada();
                if (!ultimaLista) {
                  alert('Nenhuma lista foi criada ainda.');
                  return;
                }

                const produtoParaSalvar = { id: slug, ...produto };
                const sucesso = adicionarProdutoNaLista(ultimaLista.id, produtoParaSalvar);

                if (sucesso) {
                  alert(`Produto adicionado à lista "${ultimaLista.nome}" com sucesso!`);
                } else {
                  alert('Erro ao adicionar à lista.');
                }
              }}
            >
              Adicionar à lista
            </button>

            
            <button
              className={styles['btn-outline-green']}
              onClick={() => adicionarAoCarrinho({ id: slug, ...produto })}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
