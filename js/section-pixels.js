/* ===== FALLING PIXELS BEHIND SKILLS & CONTACT ===== */
(function() {
  const canvas = document.getElementById('sectionPixels');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const colors = ['#7ee787', '#56b6c2', '#7c3aed', '#2AABEE', '#fbbf24', '#4299e1'];
  const pixels = [];
  const pixelCount = 100;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }

  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < pixelCount; i++) {
    pixels.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 2 + Math.random() * 4,
      speed: 0.1 + Math.random() * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.06 + Math.random() * 0.18,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of pixels) {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fillRect(p.x, p.y, p.size, p.size);

      p.y += p.speed;

      if (p.y > canvas.height + 10) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
        p.opacity = 0.06 + Math.random() * 0.18;
      }
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  draw();
})();
