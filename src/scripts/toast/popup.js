// Notifikasi biasa (auto-hide)
export function showPopup({ message, type = 'info' }) {
  const alert = document.getElementById('popup-alert');
  if (!alert) return;

  const iconMap = {
    success: 'check-circle',
    danger: 'x-circle',
    warning: 'alert-triangle',
    info: 'info-circle'
  };

  alert.variant = type;
  alert.innerHTML = `
    <sl-icon slot="icon" name="${iconMap[type] || 'info-circle'}"></sl-icon>
    ${message}
  `;
  alert.toast();
}

// Pop-up konfirmasi (dengan tombol Ya/Batal)
export function showConfirm({ message = 'Apakah Anda yakin?', confirmText = 'Ya', cancelText = 'Batal' }) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'popup-confirm-overlay';

    const box = document.createElement('div');
    box.className = 'popup-confirm-box';
    box.innerHTML = `
      <p>${message}</p>
      <div class="popup-confirm-buttons">
        <button class="popup-confirm-yes">${confirmText}</button>
        <button class="popup-confirm-no">${cancelText}</button>
      </div>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    overlay.querySelector('.popup-confirm-yes').addEventListener('click', () => {
      cleanup();
      resolve(true);
    });

    overlay.querySelector('.popup-confirm-no').addEventListener('click', () => {
      cleanup();
      resolve(false);
    });

    function cleanup() {
      overlay.remove();
    }
  });
}
