// toast success
export function showToastBerhasil(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
  
    const toast = document.createElement('div');
    toast.className = 'toast';  
    toast.textContent = message;
  
    container.appendChild(toast);
  
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }
  
  // toast gagal
  export function showToastGagal(message, type = 'gagal') {
    const container = document.getElementById('toast-container');
    if (!container) return;
  
    const toast_gagal = document.createElement('div');
    toast_gagal.className = 'toast_gagal';  
    toast_gagal.textContent = message;
  
    container.appendChild(toast_gagal);
  
    setTimeout(() => {
      toast_gagal.remove();
    }, 4000);
  }
  