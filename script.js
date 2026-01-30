// script.js — funcionalidades principais
document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     ELEMENTOS DO DOM
  ================================ */

  const music = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");

  const revealBtn = document.getElementById("revealBtn");
  const secret = document.getElementById("secret");
  const secretText = document.getElementById("secretText");
  const saveSecret = document.getElementById("saveSecret");
  const clearSecret = document.getElementById("clearSecret");

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  const thumbs = document.querySelectorAll(".thumb, .event-img img");
  const sections = document.querySelectorAll("main section");

  const scrollTimeline = document.getElementById("scrollTimeline");


  /* ===============================
     CONTROLE DE MÚSICA
  ================================ */

  function updateMusicState() {
    if (!music.src) {
      musicToggle.title = "Adicione áudio em /music";
      return;
    }

    if (music.paused) {
      musicToggle.textContent = "🎵";
      musicToggle.title = "Tocar música";
    } else {
      musicToggle.textContent = "⏸";
      musicToggle.title = "Pausar música";
    }
  }

  musicToggle.addEventListener("click", () => {
    if (!music.src) {
      alert("Adicione arquivo de música em /music");
      return;
    }

    music.paused ? music.play() : music.pause();
    updateMusicState();
  });

  music.addEventListener("play", updateMusicState);
  music.addEventListener("pause", updateMusicState);

  updateMusicState();


  /* ===============================
     MENSAGEM SECRETA
  ================================ */

  revealBtn.addEventListener("click", () => {
    const isOpen = secret.style.display === "block";

    if (!isOpen) {
      secret.style.display = "block";

      const saved = localStorage.getItem("secretMessage_dark");
      if (saved) secretText.value = saved;

      setTimeout(() => secretText.focus(), 200);
      revealBtn.textContent = "Ocultar mensagem";
    } else {
      secret.style.display = "none";
      revealBtn.textContent = "Revelar mensagem";
    }
  });

  saveSecret.addEventListener("click", () => {
    localStorage.setItem("secretMessage_dark", secretText.value || "");
    alert("Mensagem salva localmente.");
  });

  clearSecret.addEventListener("click", () => {
    if (confirm("Deseja limpar?")) {
      secretText.value = "";
      localStorage.removeItem("secretMessage_dark");
    }
  });


  /* ===============================
     LIGHTBOX DA GALERIA
  ================================ */

  thumbs.forEach((img) => {
    img.addEventListener("click", (e) => {
      const src =
        e.currentTarget.dataset?.src || e.currentTarget.src;

      lightboxImg.src = src;
      lightbox.style.display = "flex";
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightboxImg.src = "";
  });


  /* ===============================
     ANIMAÇÃO AO SCROLL
  ================================ */

  function revealOnScroll() {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      if (rect.top < window.innerHeight - 100) {
        section.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();


  /* ===============================
     SCROLL PARA TIMELINE
  ================================ */

  if (scrollTimeline) {
    scrollTimeline.addEventListener("click", () => {
      document
        .getElementById("timeline")
        .scrollIntoView({ behavior: "smooth" });
    });
  }


  /* ===============================
     ANIMAÇÃO DE CORAÇÕES
  ================================ */

  function spawnHeart() {
    const heart = document.createElement("div");

    heart.className = "heart";
    heart.textContent = "❤";
    heart.style.left = Math.random() * 92 + "vw";
    heart.style.bottom = "-10vh";
    heart.style.fontSize = 12 + Math.random() * 36 + "px";

    document.body.appendChild(heart);

    const duration = 5000 + Math.random() * 6000;
    const moveX = (Math.random() - 0.5) * 40;

    heart.animate(
      [
        { transform: "translateY(0) translateX(0)", opacity: 1 },
        {
          transform: `translateY(-120vh) translateX(${moveX}vw)`,
          opacity: 0,
        },
      ],
      {
        duration: duration,
        easing: "linear",
      }
    );

    setTimeout(() => heart.remove(), duration + 100);
  }

  let heartInterval = null;

  function toggleHearts(active) {
    if (active && !heartInterval) {
      heartInterval = setInterval(spawnHeart, 900);
    } else if (!active && heartInterval) {
      clearInterval(heartInterval);
      heartInterval = null;
    }
  }

  toggleHearts(window.innerWidth > 420);

  window.addEventListener("resize", () => {
    toggleHearts(window.innerWidth > 420);
  });

});
