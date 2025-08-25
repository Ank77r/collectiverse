// === particles.js config ===
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle", stroke: { width: 0, color: "#000000" }, polygon: { nb_sides: 5 } },
    opacity: { value: 0.5, random: false, anim: { enable: false } },
    size: { value: 3, random: true, anim: { enable: false } },
    line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 4, direction: "none", random: false, straight: false, out_mode: "out", attract: { enable: false } }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

// === Dark Mode Toggle ===
const toggleBtn = document.getElementById('darkModeToggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  toggleBtn.textContent = document.body.classList.contains('light-mode') ? 'Light Mode' : 'Dark Mode';
});

// === Canvas Particle Animation ===
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const PARTICLE_COUNT = 60;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5
  });
}

const mouse = { x: null, y: null };
window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let p of particles) {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

    if (mouse.x !== null && mouse.y !== null) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const angle = Math.atan2(dy, dx);
        const force = (100 - dist) / 20;
        p.speedX += Math.cos(angle) * force;
        p.speedY += Math.sin(angle) * force;
      }
    }

    p.speedX = Math.max(Math.min(p.speedX, 0.7), -0.7);
    p.speedY = Math.max(Math.min(p.speedY, 0.7), -0.7);

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fill();
  }

  requestAnimationFrame(animateParticles);
}
animateParticles();

// === Anime Tips ===
const animeTips = [
  "The universe's oldest light has been traveling for 13.8 billion years — welcome to the edge of time.",
  "In quantum physics, particles can exist in multiple states until observed — reality's ultimate mystery.",
  "A single strand of DNA contains enough information to fill a library of millions of books.",
  "Black holes aren't just destructive — they warp space and time, bending reality itself.",
  "Your brain processes information faster than the fastest supercomputer on Earth.",
  "The concept of infinity appears in math, physics, and even in some anime storylines.",
  "A human heartbeat creates enough energy to power a small LED light bulb.",
  "There are more atoms in a teaspoon of water than stars in the Milky Way.",
  "The speed of light is the universe's ultimate speed limit — nothing travels faster.",
  "Time slows down near massive objects, meaning astronauts age slightly slower in space."
];

const tipElement = document.getElementById('animeTip');
function showRandomTip() {
  const randomIndex = Math.floor(Math.random() * animeTips.length);
  tipElement.textContent = animeTips[randomIndex];
}
showRandomTip();
const tipInterval = setInterval(showRandomTip, 2000);

// === Loader Bar Completion Logic ===
const bar = document.querySelector('.bar');
bar.addEventListener('animationend', () => {
  clearInterval(tipInterval);
  const loader = document.getElementById('loader1');
  loader.classList.add('fade-out');

  loader.addEventListener('transitionend', () => {
    loader.style.display = 'none';
    const pageContent = document.getElementById('pageContent');
    if (pageContent) pageContent.style.display = 'block';
  }, { once: true });
});

// === Canvas Resize ===
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// === Scroll Hide/Show Nav ===
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  let lastScroll = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 100) {
      nav.style.transform = 'translateY(-100%)';
      nav.style.opacity = '0';
      nav.classList.add('scrolled-down');
      nav.classList.remove('scrolled-up');
    } else {
      nav.style.transform = 'translateY(0)';
      nav.style.opacity = '1';
      nav.classList.add('scrolled-up');
      nav.classList.remove('scrolled-down');
    }

    lastScroll = currentScroll;
  });
});
