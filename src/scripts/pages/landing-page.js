import { html, render } from 'lit-html';

const LandingPage = {
  render(container) {
    const template = html`
    
      <div>
        <section class="beranda" id="beranda">
          <div class="container hero-grid">
            <div class="hero-text">
              <h1>Keindahan<br />Warisan Budaya Nusantara</h1>
              <p>Temukan cerita, tradisi, dan budaya dari seluruh penjuru nusantara di satu platform.</p>
              <a href="#sorotan_budaya" class="btn-explore">Eksplor Sekarang</a>
            </div>
            <div class="hero-images">
              <div class="main-img">
                <img src="images/borobudur.jpg" alt="Candi Borobudur" />
              </div>
              <div class="side-imgs">
                <img src="images/upacara.jpg" alt="Upacara Adat di Indonesia" />
                <img src="images/dayak.jpg" alt="Penari Tradisional Suku Dayak" />
              </div>
            </div>
          </div>
        </section>

        <section class="cerita-budaya" id="sorotan_budaya">
          <div class="container">
            <h2 class="judul-seksi">Cerita Budaya</h2>
            <div class="grid-kartu-budaya">
              <div class="kartu-budaya">
                <img src="images/dayak.jpg" alt="Tarian Suku Dayak" />
                <h3>Tarian Suku Dayak</h3>
                <p>Salah satu warisan budaya Kalimantan yang penuh makna dan simbol dalam setiap gerakannya.</p>
              </div>
              <div class="kartu-budaya">
                <img src="images/borobudur.jpg" alt="Candi Borobudur" />
                <h3>Candi Borobudur</h3>
                <p>Monumen Buddha terbesar di dunia yang menjadi simbol kejayaan peradaban masa lalu di Jawa.</p>
              </div>
              <div class="kartu-budaya">
                <img src="images/upacara.jpg" alt="Upacara Adat Bali" />
                <h3>Upacara Adat Bali</h3>
                <p>Seni, budaya, dan kepercayaan menyatu dalam berbagai upacara suci masyarakat Bali.</p>
              </div>
              <div class="kartu-budaya">
                <img src="images/borobudur.jpg" alt="Relief di Candi Borobudur" />
                <h3>Relief Sejarah</h3>
                <p>Relief yang terukir di dinding Borobudur menyimpan ribuan kisah dan ajaran kehidupan.</p>
              </div>
            </div>
          </div>
        </section>

        <section class="alasan-cerita" id="keunggulan">
          <div class="container alasan-grid">
            <div class="alasan-teks">
              <h2>Kenapa Harus Cerita Budaya?</h2>
              <div class="alasan-item">
                <h3>Platform Budaya Paling Lengkap</h3>
                <p>Menampilkan cerita, tradisi, dan keunikan budaya dari seluruh pelosok Indonesia.</p>
              </div>
              <div class="alasan-item">
                <h3>Akses Cerita dari Berbagai Daerah</h3>
                <p>Nikmati cerita budaya dengan mudah melalui platform digital kami.</p>
              </div>
              <div class="alasan-item">
                <h3>Rekomendasi Cerita</h3>
                <p>Konten kurasi berdasarkan minatmu agar lebih relevan dan bermakna.</p>
              </div>
            </div>
            <div class="alasan-gambar-wrapper">
              <img src="images/web.png" alt="Kenapa Memilih Cerita Budaya?" />
            </div>
          </div>
        </section>

        <section class="kontak-kami" id="tentang_kami">
          <div class="container alasan-grid">
            <div class="kontak-form">
              <h2>Mengenal Lebih Jauh <br /> Tentang Kami</h2>
              <form>
                <div class="form-row">
                  <input type="text" placeholder="Nama Depan" required />
                  <input type="text" placeholder="Nama Belakang" required />
                </div>
                <input type="email" placeholder="Alamat Email" required />
                <textarea placeholder="Pesan Anda" required></textarea>
                <button type="submit">Kirim</button>
              </form>
            </div>
            <div class="kontak-info">
              <h3>Kontak</h3>
              <p>083855637325</p>
              <h3>Developer</h3>
              <ul>
                <li>Fattahaur Rohim <span>ML</span></li>
                <li>Pangeran Siloen <span>ML</span></li>
                <li>Benryamin Sibarani <span>ML</span></li>
                <li>Rahmatullah <span>FEBE</span></li>
                <li>Fachruddin Fahma Khoiri <span>FEBE</span></li>
                <li>Mochammad Bagas Syabani Kurniawan <span>FEBE</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section class="visi-misi" id="visi_misi">
          <div class="container">
            <div class="visi-misi-content">
              <h2>Visi & Misi</h2>
              <div class="visi">
                <h3>Visi</h3>
                <p>Menjadi platform digital terdepan dalam pelestarian dan penyebaran cerita budaya nusantara kepada generasi muda.</p>
              </div>
              <div class="misi">
                <h3>Misi</h3>
                <ul>
                  <li>Mengumpulkan cerita budaya dari berbagai daerah Indonesia.</li>
                  <li>Menyediakan platform interaktif untuk berbagi cerita.</li>
                  <li>Mengedukasi generasi muda mengenai pentingnya warisan budaya.</li>
                  <li>Berperan aktif dalam pelestarian budaya melalui teknologi.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;

    render(template, container);
  },

  afterRender(container) {
    // Smooth scroll untuk link navbar
    const navLinks = container.querySelectorAll('.nav-link'); // memilih semua elemen dengan kelas nav-link
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1); 
        const section = container.querySelector(`#${targetId}`); // memilih berdasarkan id
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' }); // smooth scroll
        }
      });
    });
  }

};

export default LandingPage;
