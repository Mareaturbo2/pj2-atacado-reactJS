import React, { useState } from 'react';
import { useCarrinho } from '../../Carrinho/Carrinho';
import { useNavigate } from 'react-router-dom';
import styles from './Carrinho.module.css';

export default function Carrinho() {
  const { carrinho, removerDoCarrinho } = useCarrinho();
  const [busca, setBusca] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const navigate = useNavigate();

  const carrinhoFiltrado = carrinho.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const total = carrinhoFiltrado.reduce((soma, item) => {
    const preco = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
    return soma + preco;
  }, 0);

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

  const finalizarCompra = () => {
    if (!endereco || carrinho.length === 0) {
      alert('Por favor, insira um CEP válido e adicione itens ao carrinho.');
      return;
    }

    navigate('/pedido', {
      state: {
        carrinho,
        endereco,
      },
    });
  };

  return (
    <div className={styles['carrinho-container']}>
      <h1 className={styles['titulo']}>Seu Carrinho</h1>

      <input
        type="text"
        placeholder="🔍 Buscar produto no carrinho"
        className={styles['campo-busca']}
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {carrinhoFiltrado.length === 0 ? (
        <p className={styles['vazio']}>Nenhum item encontrado.</p>
      ) : (
        <div className={styles['lista-itens']}>
          {carrinhoFiltrado.map((item, index) => (
            <div className={styles['item']} key={index}>
              <img src={item.imagem} alt={item.nome} />
              <div className={styles['info']}>
                <p className={styles['nome']}>{item.nome}</p>
                <p className={styles['descricao']}>Categoria | Utilidades</p>
                <p className={styles['preco']}>{item.preco}</p>
              </div>
              <button
                className={styles['remover']}
                onClick={() => removerDoCarrinho(item.id)}
              >
                Remover
              </button>
            </div>
          ))}

          <div className={styles['total']}>
            <span>Total:</span>
            <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
          </div>
        </div>
      )}

      <div className={styles['acoes']}>
        <div className={styles['botao-opcao']}>
          <p><strong>Informações de entrega</strong></p>
          <input
            type="text"
            placeholder="Digite seu CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
            style={{ padding: '0.5rem', borderRadius: '6px', marginTop: '0.5rem', width: '80%' }}
          />
          <button
            onClick={buscarEndereco}
            style={{ marginTop: '0.5rem', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.4rem 1rem' }}
          >
            Buscar Endereço
          </button>
          {endereco && <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#333' }}>📦 {endereco}</p>}
        </div>
      </div>

      <div className={styles['rodape']}>
        <button className={styles['btn-finalizar']} onClick={finalizarCompra}>
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}
