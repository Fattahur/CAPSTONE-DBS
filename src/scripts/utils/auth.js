
// KODE INI BISA
export const putAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};


export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const putUser = (userData) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

export const getUser = () => {
  const data = localStorage.getItem('userData');
  return data ? JSON.parse(data) : null;
};

export const removeAuthData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userData');
};

// Cek apakah user sudah login
export const isAuthenticated = () => {
  return !!getAccessToken();
};

export const logout = () => {
  removeAuthData(); // Hapus data autentikasi dari localStorage
  window.location.hash = '#/login'; // Arahkan ke halaman login
};


// Redirect jika sudah login (untuk halaman login/register)
export const redirectIfAuthenticated = () => {
  if (isAuthenticated()) {
    window.location.hash = '#/dashboard';
    return true;
  }
  return false;
};

// Redirect jika belum login (untuk halaman yang membutuhkan auth)
export const redirectIfNotAuthenticated = () => {
  if (!isAuthenticated()) {
    window.location.hash = '#/login';
    return true;
  }
  return false;
};




