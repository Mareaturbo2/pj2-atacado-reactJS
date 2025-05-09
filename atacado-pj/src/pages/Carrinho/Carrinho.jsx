import React from 'react';
import { useCarrinho } from '../../Carrinho/Carrinho';
import './Carrinho.css';

export default function Carrinho() {
  const { carrinho, removerDoCarrinho } = useCarrinho();

 
  const total = carrinho.reduce((soma, item) => {
    const preco = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
    return soma + preco;
  }, 0);

  return (
    <div className="carrinho-container">
      <h1 className="titulo">Seu Carrinho</h1>

      <input
        type="text"
        placeholder="🔍 Buscar produto no carrinho"
        className="campo-busca"
        disabled
      />

      {carrinho.length === 0 ? (
        <p className="vazio">O carrinho está vazio.</p>
      ) : (
        <div className="lista-itens">
          {carrinho.map((item, index) => (
            <div className="item" key={index}>
              <img src={item.imagem} alt={item.nome} />
              <div className="info">
                <p className="nome">{item.nome}</p>
                <p className="descricao">Categoria | Utilidades</p>
                <p className="preco">{item.preco}</p>
              </div>
              <button className="remover" onClick={() => removerDoCarrinho(item.id)}>
                Remover
              </button>
            </div>
          ))}

         
          <div className="total">
            <span>Total:</span>
            <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
          </div>
        </div>
      )}

      <div className="acoes">
        <button className="botao-opcao">Aplicar cupom de desconto</button>
        <button className="botao-opcao">Métodos de pagamento</button>
        <button className="botao-opcao">Informações de entrega</button>
      </div>

      <div className="rodape">
        <button className="btn-finalizar">Finalizar Compra</button>
      </div>
    </div>
  );
}
