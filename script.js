/* =========================
   FINAL BOOK LOGIC (FIXED)
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const book = document.getElementById("book");
  const bookPage = document.getElementById("bookPage");
  const pageContent = document.getElementById("pageContent");
  const nextPageBtn = document.getElementById("nextPageBtn");
  const flowerContainer = document.getElementById("flower-container");

  if (!book) return; // sirf final page pe chale

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
  const words = bookText.trim().split(" ");
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

  nextPageBtn.addEventListener("click", e => {
    e.stopPropagation(); // book click se clash na ho
    currentPage++;
    if (currentPage < pages.length) {
      pageContent.innerText = pages[currentPage];
    } else {
      nextPageBtn.style.display = "none";
    }
  });

  /* =========================
   FINAL BOOK LOGIC (FIXED)
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const book = document.getElementById("book");
  const bookPage = document.getElementById("bookPage");
  const pageContent = document.getElementById("pageContent");
  const nextPageBtn = document.getElementById("nextPageBtn");
  const flowerContainer = document.getElementById("flower-container");

  if (!book) return; // sirf final page pe chale

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
  const words = bookText.trim().split(" ");
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

  nextPageBtn.addEventListener("click", e => {
    e.stopPropagation(); // book click se clash na ho
    currentPage++;
    if (currentPage < pages.length) {
      pageContent.innerText = pages[currentPage];
    } else {
      nextPageBtn.style.display = "none";
    }
  });

  /* BOOK OPEN + FLOWERS */
  book.addEventListener("click", () => {
    book.classList.add("open");
    bookPage.classList.remove("hidden");
    launchFlowers();
  });

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
});
});