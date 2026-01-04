/* =========================
   PASSWORD PAGE LOGIC
========================= */

function unlock() {
  const passwordInput = document.getElementById("passwordInput");
  const errorMsg = document.getElementById("errorMsg");

  // Safety check (agar element hi na ho)
  if (!passwordInput) return;

  const password = passwordInput.value;

  if (!password) {
    errorMsg.textContent = "Please enter the magic word ✨";
    return;
  }

  fetch("http://localhost:5000/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // Success → next page
        window.location.href = "wish.html";
      } else {
        errorMsg.textContent = "That magic word is not correct ❌";
      }
    })
    .catch(() => {
      errorMsg.textContent = "Server not responding 😢";
    });
}

/* =========================
   WISH PAGE – TYPING EFFECT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.getElementById("typingText");

  if (!typingElement) return; // sirf wish page pe chale

  const text =
    "Happy Birthday ❤️\nThis little website is made only for you.\nMay your smile always stay the same ✨";

  let index = 0;

  function typeEffect() {
    if (index < text.length) {
      typingElement.innerHTML +=
        text.charAt(index) === "\n" ? "<br>" : text.charAt(index);
      index++;
      setTimeout(typeEffect, 90);
    }
  }

  typeEffect();
});

/* =========================
   MEMORY SCROLL ANIMATION
========================= */

const memoryCards = document.querySelectorAll(".memory-card");

function revealMemories() {
  memoryCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealMemories);
/* =========================
   SPARK / PARTICLE EFFECT
========================= */

const canvas = document.getElementById("sparkCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);

  const particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle(x, y) {
    particles.push({
      x,
      y,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: Math.random() * -2 - 1,
      life: 100,
      color: `hsl(${Math.random() * 60 + 300}, 100%, 70%)`
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.life--;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      if (p.life <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  // Emit sparks from cards
  document.querySelectorAll(".thanks-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      createParticle(
        e.clientX - rect.left + rect.left,
        e.clientY - rect.top + rect.top
      );
    });
  });
}
/* =========================
   MEMORY IMAGE LIGHTBOX
========================= */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".memory-card img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

function closeLightbox() {
  lightbox.style.display = "none";
  lightboxImg.src = "";
}

// Close on background click
if (lightbox) {
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });
}
