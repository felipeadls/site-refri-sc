document.addEventListener("DOMContentLoaded", () => {
  const bolhasContainer = document.querySelector(".bolhas");

  for (let i = 0; i < 50; i++) {
    const span = document.createElement("span");

    const size = Math.random() * 20 + 10;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 10;

    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.left = `${left}%`;
    span.style.bottom = `-40px`;
    span.style.animationDuration = `${duration}s`;
    span.style.animationDelay = `${delay}s`;

    bolhasContainer.appendChild(span);
  }
  
});
