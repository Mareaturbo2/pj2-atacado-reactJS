import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obterListas, adicionarProdutoNaLista } from '../../utils/listas';
import styles from './VisualizarLista.module.css';
import { produtos as produtosData } from '../Produtos/produtosData';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useCarrinho } from '../../Carrinho/Carrinho';






export default function VisualizarLista() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { adicionarAoCarrinho } = useCarrinho();

  const [lista, setLista] = useState(null);
  const [busca, setBusca] = useState('');
  const [sugestoes, setSugestoes] = useState([]);
  const [selecionados, setSelecionados] = useState([]);

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
    setSelecionados(selecionados.filter(id => id !== produtoId));
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

  const exportarParaPDF = () => {
    const elemento = document.getElementById('conteudo-pdf');
    if (!elemento) return;

    html2canvas(elemento).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      pdf.save(`${lista.nome || 'lista'}.pdf`);
    });
  };

  const handleSelecionar = (idProduto) => {
    setSelecionados(prev =>
      prev.includes(idProduto)
        ? prev.filter(id => id !== idProduto)
        : [...prev, idProduto]
    );
  };

  const handleAdicionarSelecionados = () => {
    if (selecionados.length === 0) {
      alert("Nenhum item selecionado.");
      return;
    }

    const selecionadosProdutos = lista.produtos.filter(p =>
      selecionados.includes(p.id)
    );

    selecionadosProdutos.forEach(prod => adicionarAoCarrinho(prod));
    
    setSelecionados([]);
  };

  if (!lista) {
    return <p style={{ textAlign: 'center' }}>Lista não encontrada.</p>;
  }

  return (
    <div className={styles['lista-container']}>
      {/* Botão PDF discreto */}
      <button
        onClick={exportarParaPDF}
        title="Exportar PDF"
        style={{
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          position: 'absolute',
          top: '20px',
          right: '20px',
          opacity: 0.7
        }}
      >
        📄
      </button>

      <div id="conteudo-pdf">
        <h1>
          {lista.nome}
          <span className={styles['lista-id']}>#{lista.id}</span>
        </h1>

        <div className={styles['top-bar']}>
          <input
            type="text"
            className={styles['busca']}
            placeholder="🔍 Buscar produto"
            value={busca}
            onChange={handleBuscaChange}
          />
          <button className={styles['btn-adicionar']} onClick={handleAdicionarDireto}>
            Adicionar à lista
          </button>
        </div>

        {sugestoes.length > 0 && (
          <div className={styles['sugestoes']}>
            {sugestoes.map((produto, idx) => (
              <div
                key={idx}
                className={`${styles['card']} ${styles['sugestao']}`}
                onClick={() => setBusca(produto.nome)}
                style={{ cursor: 'pointer' }}
              >
                <img src={produto.imagem} alt={produto.nome} />
                <div className={styles['info']}>
                  <p className={styles['nome']}>{produto.nome}</p>
                  <p className={styles['preco']}>{produto.preco}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={styles['produtos']}>
          {lista.produtos.map((produto, index) => (
            <div className={styles['item']} key={index}>
              <input
                type="checkbox"
                checked={selecionados.includes(produto.id)}
                onChange={() => handleSelecionar(produto.id)}
                style={{ marginRight: '0.8rem' }}
              />
              <img src={produto.imagem} alt={produto.nome} />
              <div className={styles['info']}>
                <p className={styles['nome']}>{produto.nome}</p>
                <p className={styles['descricao']}>Categoria | Utilidades</p>
                <p className={styles['preco']}>{produto.preco}</p>
              </div>
              <button
                className={styles['remover']}
                onClick={() => handleRemoverProduto(produto.id)}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
       <button
                  onClick={handleAdicionarSelecionados}
                  className={styles['btnAdicionarCarrinho']}
                >
                  🛒 Adicionar selecionados ao carrinho
        </button>
        <button className={styles['btn-excluir-lista']} onClick={handleExcluirLista}>
          🗑️ Excluir Lista
        </button>
      </div>
    </div>
  );
}
