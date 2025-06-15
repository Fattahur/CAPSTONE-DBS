import RingkasanPage from '../views/ringkasan-page.js';


const RingkasanPresenter = {
  async init(container) {
  console.group('[DEBUG] Init Favorit');
  try {
    // Debug 1: Verifikasi container
    if (!container) {
      console.error('❌ Container tidak ditemukan');
      return;
    }

    // Debug 2: Cek token
    const token = localStorage.getItem('accessToken');
    console.log('🔑 Token:', token ? 'valid' : 'invalid');
    
    // Debug 3: Panggil API
    console.log('📡 Fetching data...');
    const response = await fetch('https://ceritanusantara.site/api/auth/favorit', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    
    console.log('⚡ Status:', response.status);
    
    // Debug 4: Cek response
    const text = await response.text();
    console.log('📄 Response:', text.substring(0, 200));
    
    const data = JSON.parse(text);
    console.log('📦 Parsed data:', {
      dataExists: !!data.data,
      count: data.data?.length || 0,
      sample: data.data?.[0] || null
    });

    // Render data
    RingkasanPage.render(container, {
      favoritCerita: data.data || [],
      isLoading: false,
      error: null
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    console.groupEnd();
  }
}
};



export default RingkasanPresenter;