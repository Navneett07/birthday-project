/* =========================
   PASSWORD PAGE LOGIC
========================= */

function unlock() {
  const passwordInput = document.getElementById("passwordInput");
  const errorMsg = document.getElementById("errorMsg");

  if (!passwordInput || !errorMsg) return;

  const password = passwordInput.value.trim();

  if (!password) {
    errorMsg.textContent = "Please enter the magic word ✨";
    return;
  }

  // 🔥 IMPORTANT FIX: use relative API path
  fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
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

  if (!typingElement) return;

  const text =
    "Happy Birthday Anuuuu 😘\nYe raha meri anu ka giftt\nHope so pasand aae meri ladduu ko ✨";

  let index = 0;
  typingElement.innerHTML = "";

  function typeEffect() {
    if (index < text.length) {
      typingElement.innerHTML +=
        text[index] === "\n" ? "<br>" : text[index];
      index++;
      setTimeout(typeEffect, 90);
    }
  }

  typeEffect();
});

/* =========================
   MEMORY SCROLL ANIMATION
========================= */

document.addEventListener("scroll", () => {
  document.querySelectorAll(".memory-card").forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add("show");
    }
  });
});

/* =========================
   SPARK / PARTICLE EFFECT
========================= */

const canvas = document.getElementById("sparkCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  const particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function createParticle(x, y) {
    particles.push({
      x,
      y,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: Math.random() * -2 - 1,
      life: 80,
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

  document.querySelectorAll(".thanks-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      createParticle(e.clientX, e.clientY);
    });
  });
}

/* =========================
   MEMORY IMAGE LIGHTBOX
========================= */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

if (lightbox && lightboxImg) {
  document.querySelectorAll(".memory-card img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      lightboxImg.src = "";
    }
  });
}
/* =========================
   FINAL BOOK LOGIC
========================= */

const book = document.getElementById("book");
const bookPage = document.getElementById("bookPage");
const pageContent = document.getElementById("pageContent");
const nextPageBtn = document.getElementById("nextPageBtn");
const flowerContainer = document.getElementById("flower-container");

/* ✍️ EDIT ONLY THIS TEXT */
const bookText = `
My Anuu ❤️
Ye meri life ka sabse pyaara hissa hai.
Tum jab aayi, sab kuch badal gaya.

Tumhara hona hi meri sabse badi taqat hai.
Main hamesha tumhare saath rahunga.

Forever Yours 💖
`;

/* AUTO PAGINATION */
const words = bookText.split(" ");
let pages = [];
let currentPage = 0;

function createPages() {
  let temp = "";
  words.forEach(word => {
    temp += word + " ";
    if (temp.length > 260) {
      pages.push(temp);
      temp = "";
    }
  });
  if (temp) pages.push(temp);
}

createPages();
pageContent.innerText = pages[0];

if (pages.length <= 1) {
  nextPageBtn.style.display = "none";
}

nextPageBtn.addEventListener("click", () => {
  currentPage++;
  if (currentPage < pages.length) {
    pageContent.innerText = pages[currentPage];
  } else {
    nextPageBtn.style.display = "none";
  }
});

/* BOOK OPEN + FLOWERS */
if (book) {
  book.addEventListener("click", () => {
    book.classList.add("open");
    bookPage.classList.remove("hidden");
    launchFlowers();
  });
}

/* FLOWERS */
function launchFlowers() {
  for (let i = 0; i < 30; i++) {
    const flower = document.createElement("div");
    flower.className = "flower";
    flower.innerText = ["🌸", "🌹", "🌷", "💐"][Math.floor(Math.random() * 4)];

    flower.style.left = Math.random() * window.innerWidth + "px";
    flower.style.bottom = "-30px";

    flowerContainer.appendChild(flower);

    setTimeout(() => flower.remove(), 3500);
  }
}
