/* ===============================
   APP.JS
   Animações + Tempo juntos
================================ */


/* ===============================
   ANIMAÇÃO DE CORAÇÕES
================================ */

function createHeart() {
  const heart = document.createElement("div");

  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 300);


/* ===============================
   CÁLCULO DO TEMPO JUNTOS
================================ */

function calculateTimeTogether(startDate) {
  const now = new Date();
  const start = new Date(startDate);
  const diff = now - start;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.436875); // média de dias por mês
  const years = Math.floor(months / 12);

  const remainingMonths = months % 12;
  const remainingDays = Math.floor(days % 30.436875);
  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;

  return `${years} ano, ${remainingMonths} meses, ${remainingDays} dias, ${remainingHours} horas, ${remainingMinutes} minutos, ${remainingSeconds} segundos`;
}


/* ===============================
   ATUALIZAÇÃO NO DOM
================================ */

const startDate = "2025-10-30";
const timeTogetherElement = document.getElementById("time-together");

function updateTimeTogether() {
  if (!timeTogetherElement) return;

  timeTogetherElement.innerText =
    calculateTimeTogether(startDate);
}

// Atualização inicial
updateTimeTogether();

// Atualização a cada segundo
setInterval(updateTimeTogether, 1000);
