/* ===== HERO ANIMATIONS ===== */
(function() {
  const codeCanvas = document.getElementById('codeCanvas');
  const codeCtx = codeCanvas.getContext('2d');
  const pixelCanvas = document.getElementById('pixelCanvas');
  const pixelCtx = pixelCanvas.getContext('2d');

  let W, H;

  function resizeCanvases() {
    W = window.innerWidth;
    H = window.innerHeight;
    codeCanvas.width = pixelCanvas.width = W;
    codeCanvas.height = pixelCanvas.height = H;
  }
  window.addEventListener('resize', resizeCanvases);
  resizeCanvases();

  /* ---- Code rain (LEFT HALF) ---- */
  const codeLines = [
    'const app = express()',
    'import kotlin.compose.*',
    'def parse_data(url):',
    'app.get("/api/price")',
    'fun onClick() {}',
    'db.execute(query)',
    'await fetch("/api")',
    'class Product {',
    'SELECT * FROM prices',
    'response.send(json)',
    'MaterialTheme { }',
    'def main(): pass',
    'useState([])',
    'export default Home',
    'async function api()',
    'Room.database.build()',
    'response.json()',
    'playwright.Page',
    'Column { Text("") }',
    'router.post("/auth")',
  ];

  const fontSize = 14;
  const leftW = W / 2;
  let columns = Math.floor(leftW / fontSize);
  let drops = Array.from({ length: Math.max(columns, 1) }, () =>
    Math.random() * -(H / fontSize)
  );

  /* Initial fill */
  codeCtx.fillStyle = '#0a0a0f';
  codeCtx.fillRect(0, 0, leftW, H);

  function drawCodeRain() {
    codeCtx.font = `${fontSize}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = codeLines[Math.floor(Math.random() * codeLines.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      const brightness = 0.08 + Math.random() * 0.15;
      codeCtx.fillStyle = `rgba(126, 231, 135, ${brightness})`;
      codeCtx.fillText(text, x, y);

      if (y > H + 100 && Math.random() > 0.995) {
        drops[i] = 0;
      }

      drops[i] += 0.15 + Math.random() * 0.15;
    }

    /* Fade trail — slower = smoother */
    codeCtx.fillStyle = 'rgba(10, 10, 15, 0.015)';
    codeCtx.fillRect(0, 0, leftW, H);

    requestAnimationFrame(drawCodeRain);
  }
  drawCodeRain();

  /* ---- Falling pixels (RIGHT HALF, black bg) ---- */
  const rightX = W / 2;
  const pixels = [];
  const pixelCount = 100;
  const colors = ['#7ee787', '#667eea', '#7c3aed', '#2AABEE', '#fbbf24', '#56b6c2'];

  for (let i = 0; i < pixelCount; i++) {
    pixels.push({
      x: rightX + Math.random() * leftW,
      y: Math.random() * H,
      size: 1.5 + Math.random() * 3,
      speed: 0.15 + Math.random() * 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.1 + Math.random() * 0.25,
    });
  }

  function drawPixels() {
    /* Pure black background for right half */
    pixelCtx.fillStyle = '#06060d';
    pixelCtx.fillRect(rightX, 0, leftW, H);

    for (const p of pixels) {
      pixelCtx.fillStyle = p.color;
      pixelCtx.globalAlpha = p.opacity;
      pixelCtx.fillRect(p.x, p.y, p.size, p.size);

      p.y += p.speed;
      if (p.y > H + 10) {
        p.y = -10;
        p.x = rightX + Math.random() * leftW;
        p.opacity = 0.1 + Math.random() * 0.25;
      }
    }

    pixelCtx.globalAlpha = 1;
    requestAnimationFrame(drawPixels);
  }
  drawPixels();

  /* ---- Handle resize ---- */
  window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    const halfW = W / 2;
    drops = Array.from({ length: Math.max(Math.floor(halfW / fontSize), 1) }, () =>
      Math.random() * -(H / fontSize)
    );
    for (const p of pixels) {
      p.x = halfW + Math.random() * halfW;
    }
  });
})();
