
export function obterListas() {
  const listas = localStorage.getItem('listas');
  return listas ? JSON.parse(listas) : [];
}


export function salvarListas(novasListas) {
  localStorage.setItem('listas', JSON.stringify(novasListas));
}


export function adicionarProdutoNaLista(idLista, produto) {
  const listas = obterListas();
  const index = listas.findIndex(l => l.id === idLista);
  if (index !== -1) {
    listas[index].produtos.push(produto);
    salvarListas(listas);
    return true;
  }
  return false;
}


export function obterUltimaListaCriada() {
  const listas = obterListas();
  return listas.length > 0 ? listas[listas.length - 1] : null;
}
