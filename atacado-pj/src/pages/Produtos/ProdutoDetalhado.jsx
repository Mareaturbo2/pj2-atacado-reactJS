import React, { useState } from 'react';
import styles from './ProdutoDetalhado.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../../Carrinho/Carrinho';
import { adicionarProdutoNaLista, obterUltimaListaCriada } from '../../utils/listas';

const produtos = {
  'pote-hermetico': {
    nome: 'Pote Hermético',
    preco: 'R$ 24,90',
    imagem: '/images/pote1.png',
    descricao: 'Ideal para conservar alimentos com vedação segura.',
  },
  'organizador-multiuso': {
    nome: 'Organizador Multiuso',
    preco: 'R$ 34,90',
    imagem: '/images/pote2.png',
    descricao: 'Perfeito para organizar espaços diversos com praticidade.',
  },
  'panela-antiaderente': {
    nome: 'Panela Antiaderente',
    preco: 'R$ 89,90',
    imagem: '/images/panela.png',
    descricao: 'Panela resistente com revestimento que evita que os alimentos grudem.',
  },
  'conjunto-de-potes': {
    nome: 'Conjunto de Potes',
    preco: 'R$ 49,90',
    imagem: '/images/pote3.png',
    descricao: 'Kit com potes versáteis para armazenar alimentos.',
  },
  'escorredor-de-louca': {
    nome: 'Escorredor de Louça',
    preco: 'R$ 39,90',
    imagem: '/images/escorredor.png',
    descricao: 'Funcional e com design compacto para sua pia.',
  },
  'jogo-de-facas': {
    nome: 'Jogo de Facas',
    preco: 'R$ 59,90',
    imagem: '/images/facas.png',
    descricao: 'Facas afiadas e resistentes para uso diário.',
  },
  'tabua-de-corte': {
    nome: 'Tábua de Corte',
    preco: 'R$ 19,90',
    imagem: '/images/tabua.png',
    descricao: 'Durável e fácil de limpar, ideal para cortes precisos.',
  },
  'frigideira-inox': {
    nome: 'Frigideira Inox',
    preco: 'R$ 79,90',
    imagem: '/images/frigideira.png',
    descricao: 'Frigideira elegante com excelente condução de calor.',
  },
  'modelo-wood': {
    nome: 'Modelo Wood - (03) Und –Marca Etc',
    preco: 'R$ 25,00',
    imagem: '/images/talheres-madeira.jpg',
    descricao: 'Talheres com cabo de madeira, estilo rústico e moderno.',
  },
};

export default function ProdutoDetalhado() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { adicionarAoCarrinho } = useCarrinho();
  const produto = produtos[slug];

  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [quantidade, setQuantidade] = useState(1);

  if (!produto) return <p>Produto não encontrado.</p>;

  const buscarEndereco = async () => {
    if (cep.length !== 8) {
      alert('CEP inválido. Deve conter 8 dígitos.');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado.');
        return;
      }

      const enderecoCompleto = `${data.logradouro}, ${data.bairro} - ${data.localidade} - ${data.uf}`;
      setEndereco(enderecoCompleto);
    } catch (error) {
      alert('Erro ao buscar o endereço.');
    }
  };

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
           
            <details className={styles.infoBlock} open>
              <summary>Informações sobre o produto ▸</summary>
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                {produto.descricao}
              </p>
            </details>

           
            <details className={styles.infoBlock}>
              <summary>Métodos de pagamento ▸</summary>
              <ul style={{ marginTop: '0.5rem', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                <li>💳 Cartão de Crédito (Visa, Master, Elo)</li>
                <li>💵 Boleto Bancário</li>
                <li>⚡ PIX (5% de desconto)</li>
              </ul>
            </details>

       
            <details className={styles.infoBlock}>
              <summary>Informações de entrega ▸</summary>
              <input
                type="text"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                style={{ padding: '0.5rem', borderRadius: '6px', marginTop: '0.5rem', width: '100%' }}
              />
              <button
                onClick={buscarEndereco}
                style={{ marginTop: '0.5rem', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.4rem 1rem', cursor: 'pointer' }}
              >
                Buscar Endereço
              </button>
              {endereco && <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#333' }}>📦 {endereco}</p>}
            </details>

            
          </div>

          <div className={styles.actions}>
            <button
              className={styles['btn-outline-green']}
              onClick={() => {
                adicionarAoCarrinho({ id: slug, ...produto, quantidade });
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
              onClick={() => adicionarAoCarrinho({ id: slug, ...produto, quantidade })}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
