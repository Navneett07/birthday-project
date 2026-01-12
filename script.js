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

  fetch("/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
   FINAL BOOK LOGIC (SAFE)
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const book = document.getElementById("book");
  if (!book) return; // sirf final page pe chale

  const pageContent = document.getElementById("pageContent");
  const nextPageBtn = document.getElementById("nextPageBtn");
  const flowerContainer = document.getElementById("flower-container");

  const bookText = `
My Anuu ❤️
Ye meri life ka sabse pyaara hissa hai.
Tum jab aayi, sab kuch badal gaya.

Tumhara hona hi meri sabse badi taqat hai.
Main hamesha tumhare saath rahunga.  






Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam, perferendis officiis nostrum est esse itaque ab quod asperiores incidunt earum saepe! Ab fugiat quasi eos odio atque perferendis praesentium necessitatibus voluptates pariatur quibusdam! Soluta dignissimos ad error ab mollitia aliquid similique nesciunt natus illum debitis, quasi dolorem alias placeat quis adipisci sint illo labore nam. Doloremque aspernatur suscipit, facere distinctio odit nulla unde animi quod ut esse quas temporibus soluta itaque quae sed ex, eius cum quia? Animi consectetur qui deserunt aut recusandae et repellat, mollitia, corporis voluptatibus excepturi, accusantium ea optio? Non aperiam beatae tempora hic fuga odio a esse laborum, ducimus soluta error eum quod enim reprehenderit accusamus? Nostrum pariatur eaque saepe, nihil tenetur aperiam consequuntur blanditiis deleniti officiis quisquam enim assumenda sapiente laudantium odio alias. Odit deserunt at fuga debitis quis commodi sit vel nihil cumque. Necessitatibus voluptate ab, laborum possimus optio distinctio? Ut voluptatem quibusdam unde sequi tempora molestias fuga numquam ullam maxime? Odit, soluta? Ipsum unde nulla iure. Natus sed blanditiis provident in veritatis obcaecati. Recusandae soluta aliquam id consequatur a nobis, itaque tenetur quibusdam reiciendis tempore saepe ea facilis temporibus libero rerum qui delectus. Nemo, hic eum dolor laudantium perspiciatis earum quidem qui ut corporis alias quis quibusdam voluptatum accusantium amet beatae delectus harum ex facilis quasi totam aspernatur et impedit omnis placeat! Minus voluptatum sit quaerat voluptatem, possimus dicta cum et fugit consectetur repellendus consequuntur ipsa aut nisi temporibus unde harum. Corporis quis nostrum perferendis odit. Quibusdam nesciunt quas possimus nisi iste vel obcaecati, laudantium dolore mollitia, saepe quidem quisquam numquam enim quis ad. Velit ducimus inventore molestiae doloremque! Voluptas, aperiam optio quo aliquid sed eveniet? Obcaecati, iste quo! Exercitationem quisquam nulla nesciunt neque accusamus ullam necessitatibus, quasi pariatur mollitia quia natus eius nostrum fugit possimus quaerat rem explicabo sit! Doloribus vel quo iure molestias nostrum velit porro deserunt laborum natus architecto totam temporibus vitae autem dolor recusandae fugit praesentium beatae voluptate eius, unde quis accusamus quos. Ullam iusto perferendis expedita! Sunt numquam nobis placeat doloribus! Cum molestiae dolorem architecto ex laudantium nostrum dolorum, officiis voluptate quod numquam nisi laboriosam consectetur rerum id molestias quia explicabo dicta necessitatibus vitae nulla. Eum optio cum quod a temporibus et, amet facere eos repellat. Eligendi sapiente incidunt fugit ex laudantium praesentium, earum minus veniam nemo iure eaque facere non fugiat perferendis aspernatur fuga blanditiis, numquam magni, aliquid doloremque velit illo sequi. Est voluptatibus dolore fugit laboriosam, quas officia temporibus. Reprehenderit quae perspiciatis explicabo fuga deleniti repellat a! Natus, quod! Modi dolorum dolorem sint mollitia corrupti, molestiae autem delectus adipisci nisi deserunt dignissimos obcaecati dolore asperiores ex architecto voluptatem ea! Vel aspernatur fugiat magni recusandae itaque aliquam laboriosam adipisci iure laudantium repellat cumque sequi nobis necessitatibus nisi harum eaque distinctio deleniti ratione molestiae velit omnis, a nemo beatae. Atque sint provident eaque consectetur harum ut ab aliquid possimus odio culpa, illum placeat numquam eos doloribus dolore, nobis voluptates nulla! Aliquid inventore dolorem nemo nostrum hic ex consequuntur cumque necessitatibus veritatis dicta corrupti labore cum, repudiandae repellat totam officia facere laborum odio voluptate minima omnis! Tempora, deserunt? Deleniti quis, ex praesentium magni quisquam labore necessitatibus in qui sapiente culpa sunt dolore voluptates, fugiat maxime exercitationem debitis ad beatae hic facilis omnis quo illo repellendus eos enim. Eaque eum quis quibusdam in nesciunt id nihil doloribus aspernat





Forever Yours 💖
  `;

  const words = bookText.trim().split(" ");
  const pages = [];
  let currentPage = 0;
  let temp = "";

  words.forEach(word => {
    temp += word + " ";
    if (temp.length > 220) {
      pages.push(temp.trim());
      temp = "";
    }
  });
  if (temp) pages.push(temp.trim());

  pageContent.innerText = pages[0];

  if (pages.length <= 1) nextPageBtn.style.display = "none";

  nextPageBtn.addEventListener("click", e => {
    e.stopPropagation();
    currentPage++;
    if (currentPage < pages.length) {
      pageContent.innerText = pages[currentPage];
    } else {
      nextPageBtn.style.display = "none";
    }
  });

  book.addEventListener("click", () => {
    book.classList.add("open");
    launchFlowers();
  });

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
});
