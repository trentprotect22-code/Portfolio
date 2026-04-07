/* ===== SIDE CODE ANIMATIONS (left/right of sections) ===== */
(function() {
  const codeLines = [
    'val product = ProductDao.getById(id)',
    'fun onProductSelected(product: Product) {',
    '  viewModel.navigateToProduct(product.id)',
    '}',
    '@Composable fun ProductCard(product: Product) {',
    '  Card(modifier = Modifier.clickable { }) {',
    '    Column(modifier = Modifier.padding(12.dp)) {',
    '      Text(product.name, style = typography.bodyLarge)',
    '      Text("₽${product.price}", color = Color.Green)',
    '    }',
    '  }',
    '}',
    'const express = require("express");',
    'app.get("/api/products", async (req, res) => {',
    '  const products = await db.all("SELECT * FROM products")',
    '  res.json(products)',
    '})',
    'app.post("/api/prices", (req, res) => {',
    '  const { name, price, store } = req.body',
    '  db.run("INSERT INTO prices VALUES(?,?,?)",',
    '    [name, price, store])',
    '})',
    'import requests',
    'def fetch_prices(city):',
    '  url = f"https://api.example.com/prices?q={city}"',
    '  r = requests.get(url)',
    '  return r.json().get("data", [])',
    'class UserRepository {',
    '  suspend fun getUser(id: Int): User?',
    '  suspend fun update(user: User) = db.update(user)',
    '}',
    'SELECT p.name, p.price FROM products p',
    'WHERE p.price < (SELECT AVG(price) FROM products)',
    'ORDER BY p.price ASC LIMIT 10',
    'Column { Text("Hello") }',
    'Row { Image(painter = rememberImagePainter(url)) }',
  ];

  const sideCanvases = [
    document.getElementById('sideCodeLeft'),
    document.getElementById('sideCodeRight'),
  ].filter(Boolean);

  sideCanvases.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    const fontSize = 12;
    let cols = Math.floor(canvas.offsetWidth / fontSize);
    let drops = Array.from({ length: cols }, () =>
      Math.random() * -(canvas.offsetHeight / fontSize)
    );

    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    function draw() {
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = codeLines[Math.floor(Math.random() * codeLines.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const brightness = 0.04 + Math.random() * 0.08;
        ctx.fillStyle = `rgba(126, 231, 135, ${brightness})`;
        ctx.fillText(text, x, y);

        if (y > canvas.offsetHeight + 50 && Math.random() > 0.99) {
          drops[i] = 0;
        }

        drops[i] += 0.05 + Math.random() * 0.06;
      }

      /* Fade trail — slow fade */
      ctx.fillStyle = 'rgba(10, 10, 15, 0.008)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      requestAnimationFrame(draw);
    }
    draw();
  });

  /* ===== PIXEL STRIP BETWEEN SECTIONS ===== */
  const pixelCanvas = document.getElementById('pixelStrip');
  if (pixelCanvas) {
    const ctx = pixelCanvas.getContext('2d');
    const colors = ['#7ee787', '#56b6c2', '#7c3aed', '#2AABEE', '#fbbf24', '#4299e1'];
    const pixels = [];
    const canvasW = pixelCanvas.offsetWidth;
    const canvasH = pixelCanvas.offsetHeight;

    for (let i = 0; i < 80; i++) {
      pixels.push({
        x: Math.random() * canvasW,
        y: Math.random() * canvasH,
        size: 2 + Math.random() * 4,
        speed: 0.15 + Math.random() * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.12 + Math.random() * 0.28,
      });
    }

    function drawPixels() {
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvasW, canvasH);

      for (const p of pixels) {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(p.x, p.y, p.size, p.size);

        p.y += p.speed;
        if (p.y > canvasH + 10) {
          p.y = -10;
          p.x = Math.random() * canvasW;
          p.opacity = 0.12 + Math.random() * 0.28;
        }
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(drawPixels);
    }
    drawPixels();
  }
})();
