let currentIndex = 0;
const images = document.querySelectorAll('.carousel-image');

// Função para mostrar a imagem do slide atual
function showSlide(index) {
  images.forEach((img, i) => {
    img.classList.remove('active');
    if (i === index) {
      img.classList.add('active');
    }
  });
}

// Função para ir para o slide anterior
function prevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showSlide(currentIndex);
}

// Função para ir para o próximo slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  showSlide(currentIndex);
}

// Iniciar mostrando o primeiro slide
showSlide(currentIndex);

// Avançar slides automaticamente a cada 5 segundos
setInterval(nextSlide, 5000);

// Função para buscar lista
function buscarLista() {
  const listId = document.getElementById('list-id').value;
  if (listId) {
    alert(`Buscando lista com ID: ${listId}`);
    // Aqui você pode adicionar a lógica para buscar a lista no backend
  } else {
    alert('Por favor, insira o ID da lista.');
  }
}