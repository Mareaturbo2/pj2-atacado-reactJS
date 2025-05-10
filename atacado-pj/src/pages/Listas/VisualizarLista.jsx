import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obterListas, adicionarProdutoNaLista } from '../../utils/listas';
import './VisualizarLista.css';
import { produtos as produtosData } from '../Produtos/produtosData';

export default function VisualizarLista() {
  const { id } = useParams();
  const [lista, setLista] = useState(null);
  const [busca, setBusca] = useState('');
  const [sugestoes, setSugestoes] = useState([]);

  useEffect(() => {
    const listas = obterListas();
    const encontrada = listas.find(l => l.id === id);
    setLista(encontrada || null);
  }, [id]);

  const handleAdicionarDireto = () => {
    if (!busca.trim()) return alert("Digite o nome de um produto.");

    const resultados = Object.values(produtosData).filter(p =>
      p.nome.toLowerCase().includes(busca.toLowerCase())
    );

    if (resultados.length === 0) {
      alert("Produto não encontrado.");
      return;
    }

    const produto = resultados[0];

    const jaExiste = lista.produtos.some(p => p.id === produto.id);
    if (jaExiste) {
      alert("Este produto já está na lista.");
      return;
    }

    const sucesso = adicionarProdutoNaLista(lista.id, produto);
    if (sucesso) {
      const novaLista = {
        ...lista,
        produtos: [...lista.produtos, produto],
      };
      setLista(novaLista);
      alert(`"${produto.nome}" foi adicionado à lista.`);
      setBusca('');
      setSugestoes([]);
    } else {
      alert("Erro ao adicionar o produto.");
    }
  };

  const handleBuscaChange = (e) => {
    const termo = e.target.value;
    setBusca(termo);

    if (termo.trim() === '') {
      setSugestoes([]);
      return;
    }

    const resultados = Object.values(produtosData).filter(p =>
      p.nome.toLowerCase().includes(termo.toLowerCase())
    );

    setSugestoes(resultados);
  };

  const handleRemoverProduto = (produtoId) => {
    const novaLista = {
      ...lista,
      produtos: lista.produtos.filter(p => p.id !== produtoId),
    };

    localStorage.setItem(
      'listas',
      JSON.stringify(
        obterListas().map(l => (l.id === lista.id ? novaLista : l))
      )
    );
    setLista(novaLista);
  };

  const handleExcluirLista = () => {
    const confirmacao = window.confirm(
      'Tem certeza que deseja excluir esta lista? Esta ação não poderá ser desfeita.'
    );
    if (!confirmacao) return;

    const novasListas = obterListas().filter(l => l.id !== lista.id);
    localStorage.setItem('listas', JSON.stringify(novasListas));
    alert('Lista excluída com sucesso!');
    window.location.href = '/listas';
  };

  if (!lista) {
    return <p style={{ textAlign: 'center' }}>Lista não encontrada.</p>;
  }

  return (
    <div className="lista-container">
      <h1>{lista.nome} <span className="lista-id">#{lista.id}</span></h1>

      <button className="btn-excluir-lista" onClick={handleExcluirLista}>
        🗑️ Excluir Lista
      </button>

      <div className="top-bar">
        <input
          type="text"
          className="busca"
          placeholder="🔍 Buscar produto"
          value={busca}
          onChange={handleBuscaChange}
        />
        <button className="btn-adicionar" onClick={handleAdicionarDireto}>
          Adicionar à lista
        </button>
      </div>

      {sugestoes.length > 0 && (
        <div className="sugestoes">
          {sugestoes.map((produto, idx) => (
            <div
              key={idx}
              className="card sugestao"
              onClick={() => setBusca(produto.nome)}
              style={{ cursor: 'pointer' }}
            >
              <img src={produto.imagem} alt={produto.nome} />
              <div className="info">
                <p className="nome">{produto.nome}</p>
                <p className="preco">{produto.preco}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="produtos">
        {lista.produtos.map((produto, index) => (
          <div className="item" key={index}>
            <img src={produto.imagem} alt={produto.nome} />
            <div className="info">
              <p className="nome">{produto.nome}</p>
              <p className="descricao">Categoria | Utilidades</p>
              <p className="preco">{produto.preco}</p>
            </div>
            <button className="remover" onClick={() => handleRemoverProduto(produto.id)}>
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
