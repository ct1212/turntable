const Theme = {
  init() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    this.update(btn);

    btn.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme;
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('tt_theme', next);
      this.update(btn);
    });
  },

  update(btn) {
    const isDark = document.documentElement.dataset.theme !== 'light';
    btn.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19';
  }
};

Theme.init();
