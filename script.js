document.documentElement.classList.add("js-enabled");

const portfolioImages = [
  {
    title: "Identidade da Marca",
    category: "Identidade",
    src: "assets/nikki-hero.png",
    alt: "Eu com iluminação verde neon",
    layout: "large",
  },
  {
    title: "Logotipo Nikki Lab",
    category: "Branding",
    src: "assets/nikki-logo-card.png",
    alt: "Logo branca Nikki Lab sobre fundo preto texturizado",
    layout: "wide",
  },
  {
    title: "Social Media",
    category: "Produção",
    src: "assets/nikki-social-media.png",
    alt: "Eu segurando câmera com lettering social media em verde",
    layout: "large",
  },
  {
    title: "Conteúdo para Redes Sociais",
    category: "Social Media",
    src: "assets/duvido-voce-resistir.jpg",
    alt: "Campanha para redes sociais",
  },
  {
    title: "Conteúdo para Redes Sociais",
    category: "Social Media",
    src: "assets/hoje-e-dia-de-pizza.jpg",
    alt: "Post para redes sociais",
  },
  {
    title: "Post Stories para Loja",
    category: "Design",
    src: "assets/neto-store.jpg",
    alt: "Projeto gráfico para a Neto Store",
    layout: "large",
  },
  {
    title: "Design de Camisa Personalizada",
    category: "Design",
    src: "assets/segundao-projeto.jpg",
    alt: "Projeto grafico",
  },
  {
    title: "Estampa para Evento Escolar",
    category: "Design",
    src: "assets/camisa-primeirao.jpg",
    alt: "Projeto Primeirao",
  },
  {
    title: "Verso de Uniforme Personalizado",
    category: "Social Media",
    src: "assets/camisa-primeiraoverso.jpg",
    alt: "Verso da camisa Primeirao",
  },
  {
    title: "Design para Uniforme Escolar",
    category: "Design",
    src: "assets/camisa-gama.jpg",
    alt: "Projeto de camisa",
  },
  {
    title: "Campanha Institucional",
    category: "Social Media",
    src: "assets/matriculasabertas.jpg",
    alt: "Arte para campanha de matriculas",
    layout: "wide",
  },
  {
    title: "Identidade para Turma",
    category: "Branding",
    src: "assets/logo-terceirao.jpg",
    alt: "Logo Terceirao",
  },
];

const body = document.body;
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const gallery = document.querySelector("[data-gallery]");
const parallaxLayer = document.querySelector("[data-parallax]");
const year = document.querySelector("[data-year]");

year.textContent = new Date().getFullYear();

// gera os cards da galeria a partir da lista portfolioImages em cimaa
portfolioImages.forEach((image, index) => {
  const card = document.createElement("article");
  card.className = `gallery-card reveal ${image.layout ? `is-${image.layout}` : ""}`;
  card.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;

  card.innerHTML = `
    <img src="${image.src}" alt="${image.alt}" loading="lazy" decoding="async">
    <div class="gallery-meta">
      <span class="gallery-title">${image.title}</span>
      <span class="gallery-category">${image.category}</span>
    </div>
  `;

  gallery.appendChild(card);
});

// menu mobile com fechamento automático ao clicar em uma âncora
const setMenuState = (isOpen) => {
  nav.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  body.classList.toggle("nav-open", isOpen);
};

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

// revela elementos suavemente
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("is-visible");
  });
}

// ajustes visuais no scroll, header compacto e parallax no hero
const updateScrollEffects = () => {
  const scrollY = window.scrollY;
  header.classList.toggle("is-scrolled", scrollY > 24);

  if (parallaxLayer && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    parallaxLayer.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0) scale(1.04)`;
  }
};

updateScrollEffects();
window.addEventListener("scroll", updateScrollEffects, { passive: true });
