document.addEventListener("DOMContentLoaded", function () {
  // CARROSSEL DE PRODUTOS
  const carrosselProdutos = document.getElementById("carrossel-produtos");
  const setaAnteriorProdutos = document.getElementById("seta-anterior-produto");
  const setaProximoProdutos = document.getElementById("seta-proximo-produto");
  const produtos = document.querySelectorAll(".produto-item");
  const secoesDetalhes = document.querySelectorAll(".descricao-produto");

  let indiceAtualProdutos = 0;

  function atualizarSectionDetalhes() {
  if (produtos.length === 0) return;

  const produtoAtual = produtos[indiceAtualProdutos];
  const idSection = produtoAtual.dataset.sectionId;
  const corDeFundo = produtoAtual.dataset.color;

  // Atualiza o fundo da section principal com a cor do produto
  const sectionProdutos = document.querySelector(".section-produtos-agua");
  if (corDeFundo && sectionProdutos) {
    sectionProdutos.style.background = corDeFundo;
  }

  // Atualiza visibilidade das seções de detalhes
  secoesDetalhes.forEach((secao) => {
    if (secao.id === idSection) {
      secao.style.display = "block";
      secao.style.opacity = 0;
      setTimeout(() => {
        secao.style.opacity = 1;
        secao.style.transition = "opacity 0.5s ease-in-out";
      }, 10);
    } else {
      secao.style.opacity = 0;
      setTimeout(() => {
        secao.style.display = "none";
      }, 500);
    }
  });
}


  function atualizarCarrosselProdutos() {
    if (produtos.length > 0) {
      produtos[indiceAtualProdutos].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
      atualizarSectionDetalhes();
    }
  }

  if (setaProximoProdutos && setaAnteriorProdutos) {
    setaProximoProdutos.addEventListener("click", () => {
      indiceAtualProdutos = (indiceAtualProdutos + 1) % produtos.length;
      atualizarCarrosselProdutos();
    });

    setaAnteriorProdutos.addEventListener("click", () => {
      indiceAtualProdutos =
        (indiceAtualProdutos - 1 + produtos.length) % produtos.length;
      atualizarCarrosselProdutos();
    });
  }

  // Atualiza a descrição ao iniciar
  atualizarSectionDetalhes();

  // --- CARROSSEL DE BANNERS (sem alterações)
  const carrosselContainer = document.getElementById("carrossel-banners");

  if (carrosselContainer) {
    const banners = carrosselContainer.querySelectorAll(".banner-item");
    const dotsContainer = carrosselContainer.querySelector(".banner-dots");
    let indiceAtualBanners = 0;
    let slideInterval;

    if (banners.length > 0 && dotsContainer) {
      const atualizarCarrossel = () => {
        banners.forEach((banner, index) => {
          banner.classList.toggle("active", index === indiceAtualBanners);
        });
        const dots = dotsContainer.querySelectorAll(".banner-dot");
        dots.forEach((dot) => {
          dot.classList.toggle(
            "active",
            parseInt(dot.dataset.index) === indiceAtualBanners
          );
        });
      };

      banners.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("banner-dot");
        dot.dataset.index = index;

        dot.addEventListener("click", () => {
          indiceAtualBanners = index;
          atualizarCarrossel();
          reiniciarIntervalo();
        });

        dotsContainer.appendChild(dot);
      });

      const proximoSlide = () => {
        indiceAtualBanners = (indiceAtualBanners + 1) % banners.length;
        atualizarCarrossel();
      };

      const iniciarIntervalo = () => {
        slideInterval = setInterval(proximoSlide, 5000);
      };

      const reiniciarIntervalo = () => {
        clearInterval(slideInterval);
        iniciarIntervalo();
      };

      atualizarCarrossel();
      iniciarIntervalo();
    }
  }
});