const unlock = new Date("2026-05-27T00:00:00+05:30");

function update() {
  const now = new Date();
  const diff = unlock - now;

  if (diff <= 0) {
    location.href = "/";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  document.getElementById("countdown").innerText =
    `${d}d ${h}h ${m}m ${s}s`;
}

setInterval(update, 1000);
update();
