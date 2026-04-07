/* ===== SCROLL ANIMATIONS ===== */
(function() {
  const fadeInElements = document.querySelectorAll('.fade-in');
  const skillItems = document.querySelectorAll('.skill-item');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.15
  };

  /* Fade in on scroll */
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeInElements.forEach(el => fadeInObserver.observe(el));

  /* Skill items stagger */
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const grid = entry.target;
        const items = grid.querySelectorAll('.skill-item');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('animate-in');
            /* Animate skill bar fill */
            const fill = item.querySelector('.skill-fill');
            if (fill) {
              const targetWidth = fill.dataset.width;
              const color = item.querySelector('.skill-name').dataset.color;
              fill.style.width = targetWidth;
              fill.style.background = color;
              fill.parentElement.nextElementSibling.style.color = color;
              item.querySelector('.skill-name').style.color = color;
            }
          }, index * 100);
        });
        skillObserver.unobserve(grid);
      }
    });
  }, { threshold: 0.2 });

  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid) {
    skillObserver.observe(skillsGrid);
  }
})();
