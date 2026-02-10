const Voting = {
  myVote: null, // 'awesome' | 'lame' | null

  init() {
    document.getElementById('vote-awesome').addEventListener('click', () => {
      Socket.emit('vote:awesome');
      this.myVote = 'awesome';
      this.updateButtons();
    });

    document.getElementById('vote-lame').addEventListener('click', () => {
      Socket.emit('vote:lame');
      this.myVote = 'lame';
      this.updateButtons();
    });
  },

  onUpdate(data) {
    const awesomeEl = document.getElementById('awesome-count');
    const lameEl = document.getElementById('lame-count');

    const prevAwesome = parseInt(awesomeEl.textContent) || 0;
    const prevLame = parseInt(lameEl.textContent) || 0;

    const newAwesome = data.awesome || 0;
    const newLame = data.lame || 0;

    awesomeEl.textContent = newAwesome;
    lameEl.textContent = newLame;

    // Floating vote animations
    if (newAwesome > prevAwesome) {
      this.floatReaction('vote-awesome', '+1', 'awesome');
    }
    if (newLame > prevLame) {
      this.floatReaction('vote-lame', '-1', 'lame');
    }
  },

  resetVote() {
    this.myVote = null;
    this.updateButtons();
  },

  updateButtons() {
    const awesomeBtn = document.getElementById('vote-awesome');
    const lameBtn = document.getElementById('vote-lame');

    awesomeBtn.classList.toggle('active', this.myVote === 'awesome');
    lameBtn.classList.toggle('active', this.myVote === 'lame');
  },

  floatReaction(btnId, text, type) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const el = document.createElement('div');
    el.className = 'vote-float ' + type;
    el.textContent = text;
    el.style.left = (rect.left + rect.width / 2 - 12) + 'px';
    el.style.top = (rect.top - 5) + 'px';
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
};
