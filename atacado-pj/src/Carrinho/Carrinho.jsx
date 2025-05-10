import React, { createContext, useContext, useState } from 'react';

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => [...prev, produto]);
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => prev.filter(p => p.id !== id));
  };

  const limparCarrinho = () => {
    setCarrinho([]); 
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho, 
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContext);
