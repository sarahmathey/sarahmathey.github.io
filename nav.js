/* nav.js — shared nav + footer injected on every page */
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';

  const pages = [
    { href: 'index.html',     label: 'Home' },
    { href: 'network.html',   label: 'Scam PAC Explorer' },
    { href: 'dataviz.html',   label: 'Data Viz' },
    { href: 'timeline.html',  label: 'Timeline' },
    { href: 'writing.html',   label: 'Writing' },
    { href: 'reading.html',   label: 'Reading' },
    { href: 'resources.html', label: 'Resources' },
  ];

  const links = pages
    .map(p => `<li><a href="${p.href}"${p.href === path ? ' class="active"' : ''}>${p.label}</a></li>`)
    .join('');

  // Mobile menu toggle id
  const menuId = 'nav-menu';

  document.body.insertAdjacentHTML('afterbegin', `
    <nav>
      <a href="index.html" class="nav-logo">Sarah Mathey</a>
      <button class="nav-toggle" aria-label="Toggle menu" aria-controls="${menuId}"
        onclick="
          var m = document.getElementById('${menuId}');
          var open = m.classList.toggle('open');
          this.setAttribute('aria-expanded', open);
          this.querySelector('.bar-mid').style.opacity = open ? '0' : '1';
          this.querySelector('.bar-top').style.transform = open ? 'translateY(6px) rotate(45deg)' : '';
          this.querySelector('.bar-bot').style.transform = open ? 'translateY(-6px) rotate(-45deg)' : '';
        ">
        <span class="bar-top"></span>
        <span class="bar-mid"></span>
        <span class="bar-bot"></span>
      </button>
      <ul class="nav-links" id="${menuId}">${links}</ul>
    </nav>
  `);

  document.body.insertAdjacentHTML('beforeend', `
    <footer>
      <span class="footer-copy">© 2026 Sarah Mathey/span>
      <span class="footer-copy">Hosted on GitHub Pages</span>
    </footer>
  `);

  // Close mobile menu on link click
  document.querySelectorAll(`#${menuId} a`).forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById(menuId).classList.remove('open');
    });
  });

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();
