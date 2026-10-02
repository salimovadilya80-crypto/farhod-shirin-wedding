const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");
const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");
const audio = document.getElementById("weddingAudio");
const musicBtn = document.getElementById("musicBtn");
const musicText = document.getElementById("musicText");

let opened = false;
let musicOn = false;

function openInvitation() {
  if (opened) return;
  opened = true;

  envelope.classList.add("open");

  // Start the music only after the visitor's tap/click.
  audio.volume = 0.55;
  audio.play().then(() => {
    musicOn = true;
    musicText.textContent = "Ovoz";
  }).catch(() => {
    musicText.textContent = "Musiqa";
  });

  setTimeout(() => {
    invitation.classList.remove("hidden");
    document.body.classList.remove("no-scroll");
    opening.classList.add("hide");
    window.scrollTo({top: 0, behavior: "instant"});
    observeReveals();
  }, 900);
}

openBtn.addEventListener("click", openInvitation);
envelope.addEventListener("click", openInvitation);
envelope.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openInvitation();
  }
});

musicBtn.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicOn = true;
      musicText.textContent = "Ovoz";
    } catch {}
  } else {
    audio.pause();
    musicOn = false;
    musicText.textContent = "Musiqa";
  }
});

/* Countdown: 1 November 2026, 16:00, Osh local time */
const weddingDate = new Date("2026-11-01T16:00:00+06:00");

function updateCountdown() {
  const now = new Date();
  let diff = weddingDate.getTime() - now.getTime();

  if (diff < 0) diff = 0;

  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* Scroll reveal */
let observer;
function observeReveals() {
  if (observer) observer.disconnect();

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

/* Gallery lightbox */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lightboxImg.src = item.dataset.full;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  });
});

function closeGallery() {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}
closeLightbox.addEventListener("click", closeGallery);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeGallery();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeGallery();
});

/* Back to top */
document.getElementById("backTop").addEventListener("click", () => {
  window.scrollTo({top: 0, behavior: "smooth"});
});
