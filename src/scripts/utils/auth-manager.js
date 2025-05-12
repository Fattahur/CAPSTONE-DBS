// auth-manager.js
export const AuthManager = {
    login: (userData) => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(userData || {}));
      window.dispatchEvent(new CustomEvent('authStateChanged'));
    },
    logout: () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userData');
      window.dispatchEvent(new CustomEvent('authStateChanged'));
      window.location.hash = '#/login';
    },
    isLoggedIn: () => localStorage.getItem('isLoggedIn') === 'true'
  };