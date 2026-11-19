const btn=document.querySelector(".menu-btn");const links=document.querySelector(".nav-links");btn.addEventListener("click",()=>{const open=links.classList.toggle("open");btn.setAttribute("aria-expanded",String(open))});document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>{links.classList.remove("open");btn.setAttribute("aria-expanded","false")}));const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));document.getElementById("year").textContent=new Date().getFullYear();

const heroVideo = document.querySelector(".hero-video");
const heroPlayback = document.querySelector(".hero-playback");
const mobileHero = window.matchMedia("(max-width: 720px)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const header = document.querySelector(".header");
const hero = document.querySelector(".hero");

const headerObserver = new IntersectionObserver(([entry]) => {
  header.classList.toggle("past-hero", entry.boundingClientRect.bottom <= header.offsetHeight);
}, { rootMargin: `-${header.offsetHeight}px 0px 0px` });
headerObserver.observe(hero);

function playHeroVideo() {
  if (!heroVideo.hasAttribute("src")) {
    heroVideo.src = heroVideo.dataset.src;
  }
  heroVideo.muted = true;
  heroVideo.play().catch(() => {
    heroPlayback.textContent = "Play background video";
  });
}

heroVideo.addEventListener("play", () => {
  heroPlayback.textContent = "Pause background video";
});
heroVideo.addEventListener("pause", () => {
  heroPlayback.textContent = "Play background video";
});
heroVideo.addEventListener("error", () => {
  heroPlayback.hidden = true;
});
heroPlayback.addEventListener("click", () => {
  if (heroVideo.paused) {
    playHeroVideo();
  } else {
    heroVideo.pause();
  }
});
reducedMotion.addEventListener("change", (event) => {
  if (event.matches) {
    heroVideo.pause();
  }
});

function updateHeroVideo() {
  heroPlayback.hidden = mobileHero.matches;
  if (mobileHero.matches) {
    if (heroVideo.hasAttribute("src")) {
      heroVideo.pause();
      heroVideo.removeAttribute("src");
      heroVideo.load();
    }
  } else if (!reducedMotion.matches) {
    playHeroVideo();
  }
}

mobileHero.addEventListener("change", updateHeroVideo);
updateHeroVideo();
