/* ===== TERMINAL UI: Tabs, cursor, navbar ===== */
(function() {
  /* -- Tabs -- */
  const tabs = document.querySelectorAll('.terminal-tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => {
        c.classList.remove('active');
        c.style.display = 'none';
      });

      tab.classList.add('active');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      target.style.display = 'block';
      requestAnimationFrame(() => {
        target.classList.add('active');
      });
    });
  });

  /* -- Navbar scroll effect -- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
})();
