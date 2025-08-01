// Cursor Target Logic
const cursor = document.getElementById("target-cursor");
const corners = cursor.querySelectorAll(".target-corner");
const cornerSize = 12;

document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.2,
    ease: "power3.out"
  });
});

const targets = document.querySelectorAll("a, button, .cursor-target, .skill-card, .social-btn");
targets.forEach((target) => {
  target.addEventListener("mouseenter", () => {
    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsets = [
      { x: rect.left - centerX - 3, y: rect.top - centerY - 3 },
      { x: rect.right - centerX - cornerSize + 3, y: rect.top - centerY - 3 },
      { x: rect.right - centerX - cornerSize + 3, y: rect.bottom - centerY - cornerSize + 3 },
      { x: rect.left - centerX - 3, y: rect.bottom - centerY - cornerSize + 3 },
    ];

    corners.forEach((corner, i) => {
      gsap.to(corner, {
        x: offsets[i].x,
        y: offsets[i].y,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  target.addEventListener("mouseleave", () => {
    const resetOffsets = [
      { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
      { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
      { x: cornerSize * 0.5, y: cornerSize * 0.5 },
      { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
    ];
    corners.forEach((corner, i) => {
      gsap.to(corner, {
        x: resetOffsets[i].x,
        y: resetOffsets[i].y,
        duration: 0.3,
        ease: "power3.out"
      });
    });
  });
});

// Scroll to Top Button
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollBtn.classList.toggle("show", window.scrollY > 400);
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Particle Canvas Background
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 2 + 1
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#00ffff';
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
