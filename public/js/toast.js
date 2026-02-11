// Toast notification utility
const Toast = {
  show(message, type = 'info', duration = null) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast' + (type === 'error' ? ' error' : '');
    toast.textContent = message;
    container.appendChild(toast);

    // Default durations: 3s for errors, 5s for info messages
    const displayTime = duration || (type === 'error' ? 3000 : 5000);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, displayTime);
  }
};
