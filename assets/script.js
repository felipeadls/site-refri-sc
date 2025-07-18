document.addEventListener('DOMContentLoaded', function () {
  // CARROSSEL DE PRODUTOS
  const carrosselProdutos = document.getElementById('carrossel-produtos');
  const setaAnteriorProdutos = document.getElementById('seta-anterior-produto');
  const setaProximoProdutos = document.getElementById('seta-proximo-produto');
  const produtos = document.querySelectorAll('.produto-item');
  let indiceAtualProdutos = 0;
  let camadaAtiva = 'after';

  function mudarCorDeFundo() {
    if (produtos.length > 0 && produtos[indiceAtualProdutos].dataset.color) {
      const novoGradiente = produtos[indiceAtualProdutos].dataset.color;

      if (camadaAtiva === 'after') {
        document.documentElement.style.setProperty('--gradiente-1', novoGradiente);
        document.body.style.opacity = '0';
        document.body.offsetHeight;
        document.body.style.opacity = '1';
        document.body.classList.add('fade-out-after');
        camadaAtiva = 'before';
      } else {
        document.documentElement.style.setProperty('--gradiente-2', novoGradiente);
        document.body.classList.remove('fade-out-after');
        camadaAtiva = 'after';
      }
    }
  }

  function atualizarCarrosselProdutos() {
    if (produtos.length > 0) {
      produtos[indiceAtualProdutos].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
      mudarCorDeFundo();
    }
  }

  if (setaProximoProdutos && setaAnteriorProdutos) {
    setaProximoProdutos.addEventListener('click', () => {
      indiceAtualProdutos = (indiceAtualProdutos + 1) % produtos.length;
      atualizarCarrosselProdutos();
    });

    setaAnteriorProdutos.addEventListener('click', () => {
      indiceAtualProdutos = (indiceAtualProdutos - 1 + produtos.length) % produtos.length;
      atualizarCarrosselProdutos();
    });
  }

  if (produtos.length > 0) {
    const gradienteInicial = produtos[indiceAtualProdutos].dataset.color;
    if (gradienteInicial) {
      document.documentElement.style.setProperty('--gradiente-2', gradienteInicial);
    }
  }

  const sectionProdutos = document.querySelector('.section-produtos');
  if (sectionProdutos) {
    const bg = sectionProdutos.getAttribute('data-color');
    if (bg) {
      sectionProdutos.style.background = bg;
    }
  }

  // --- CARROSSEL DE BANNERS
  const carrosselContainer = document.getElementById('carrossel-banners');
  
  // Verifica se o carrossel de banners existe na página
  if (carrosselContainer) {
    const banners = carrosselContainer.querySelectorAll('.banner-item');
    const dotsContainer = carrosselContainer.querySelector('.banner-dots');
    let indiceAtualBanners = 0;
    let slideInterval; 

    // Continua apenas se houver banners e o container de dots
    if (banners.length > 0 && dotsContainer) {
      
      // 1. Função para atualizar o carrossel (mostra o banner e o dot corretos)
      const atualizarCarrossel = () => {
        banners.forEach((banner, index) => {
          banner.classList.toggle('active', index === indiceAtualBanners);
        });
        const dots = dotsContainer.querySelectorAll('.banner-dot');
        dots.forEach(dot => {
          dot.classList.toggle('active', parseInt(dot.dataset.index) === indiceAtualBanners);
        });
      };
      
      banners.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('banner-dot');
        dot.dataset.index = index;
        
        dot.addEventListener('click', () => {
          indiceAtualBanners = index;
          atualizarCarrossel();
          reiniciarIntervalo(); // Reinicia o timer quando o usuário clica
        });
        
        dotsContainer.appendChild(dot);
      });

      // 3. Funções para controlar o carrossel automático
      const proximoSlide = () => {
        indiceAtualBanners = (indiceAtualBanners + 1) % banners.length;
        atualizarCarrossel();
      };
      
      const iniciarIntervalo = () => {
        slideInterval = setInterval(proximoSlide, 5000); // 5000ms = 5 segundos
      };

      const reiniciarIntervalo = () => {
        clearInterval(slideInterval);
        iniciarIntervalo();
      };

      // 4. Inicia o carrossel
      atualizarCarrossel();
      iniciarIntervalo();
    }
  }
});

document.addEventListener('keydown', function (event) {
  // Verifica se a tecla pressionada foi a 'Escape'
  if (event.key === 'Escape') {
    // Encontra todos os modais que estão abertos
    const modaisAbertos = document.querySelectorAll('.modal-container:target');

    // Fecha cada modal aberto redirecionando para '#'
    modaisAbertos.forEach(modal => {
      window.location.hash = '#';
    });
  }
});