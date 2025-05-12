
    import { html, render } from 'lit-html';
    
    const JelajahPage = {
      async render(container) {
        const template = html`
          <section class="beranda">
            
            <div class="container">
              <h1>Selamat Datang di Halaman Jelajah Budaya</h1>
              <p>Ini adalah halaman utama setelah login berhasil.</p>
            </div>
          </section>
        `;
        render(template, container);
      },
    
      async afterRender(container) {
        // Tambahkan interaksi/animasi di sini jika perlu
      },
    };
    
    export default JelajahPage;
    