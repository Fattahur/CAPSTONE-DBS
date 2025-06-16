
import { html, render } from 'lit';

import AOS from 'aos';
import 'aos/dist/aos.css';

const LandingPage = {
  render(container) {
    const template = html`
      <div>
        <section class="beranda" id="beranda">
          <div class="container hero-grid">
            <div class="hero-text">

            <div class="typing-wrapper" data-aos="fade-up" data-aos-duration="1000">
              <h1 id="typing-text"></h1>
            </div>

              <p data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                Temukan cerita, tradisi, dan budaya dari seluruh penjuru nusantara di satu platform.
              </p>
              <a href="#sorotan_budaya" class="btn-explore" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                Eksplor Sekarang
              </a>
              <blockquote data-aos="fade-up" data-aos-delay="600">
                "Tak lapuk oleh hujan, tak lekang oleh panas – warisan budaya kita selamanya hidup."
              </blockquote>
            </div>

            <div class="hero-images" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="1000">
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

      <!-- Placeholder Section -->
        <section class="cerita-budaya" id="sorotan_budaya">
          <div class="container">
            <h2 class="judul-seksi" data-aos="fade-up">Cerita Budaya</h2>
            <div class="grid-kartu-budaya">
              <div class="kartu-budaya" data-aos="fade-up" data-aos-delay="100">
                <img src="images/dayak.jpg" alt="Tarian Suku Dayak" />
                <h3>Tarian Suku Dayak</h3>
                <p>Salah satu warisan budaya Kalimantan yang penuh makna dan simbol dalam setiap gerakannya.</p>
              </div>
              <div class="kartu-budaya" data-aos="fade-up" data-aos-delay="200">
                <img src="images/borobudur.jpg" alt="Candi Borobudur" />
                <h3>Candi Borobudur</h3>
                <p>Monumen Buddha terbesar di dunia yang menjadi simbol kejayaan peradaban masa lalu di Jawa.</p>
              </div>
              <div class="kartu-budaya" data-aos="fade-up" data-aos-delay="300">
                <img src="images/upacara.jpg" alt="Upacara Adat Bali" />
                <h3>Upacara Adat Bali</h3>
                <p>Seni, budaya, dan kepercayaan menyatu dalam berbagai upacara suci masyarakat Bali.</p>
              </div>
              <div class="kartu-budaya" data-aos="fade-up" data-aos-delay="400">
                <img src="images/borobudur.jpg" alt="Relief di Candi Borobudur" />
                <h3>Relief Sejarah</h3>
                <p>Relief yang terukir di dinding Borobudur menyimpan ribuan kisah dan ajaran kehidupan.</p>
              </div>
            </div>
          </div>
        </section>

        <section class="alasan-cerita" id="keunggulan">
          <div class="container alasan-grid">
            <div class="alasan-teks" data-aos="fade-right" data-aos-duration="1000">
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
            <div class="alasan-gambar-wrapper" data-aos="fade-left" data-aos-duration="1000">
              <img src="images/web.png" alt="Kenapa Memilih Cerita Budaya?" />
            </div>
          </div>
        </section>

        <section class="kontak-kami" id="tentang_kami">
          <div class="container alasan-grid">
            <div class="kontak-form" data-aos="fade-up" data-aos-duration="1000">
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
            <div class="kontak-info" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
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
          <div class="container" data-aos="fade-up" data-aos-duration="1000">
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
    AOS.init();

    const navLinks = container.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const section = container.querySelector(`#${targetId}`);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    AOS.refresh();

    // Typing effect with loop
    const textArray = [
      "Keindahan\nWarisan Budaya Nusantara",
      "Cerita Tradisi dari Sabang sampai Merauke",
      "Eksplorasi Budaya dalam Genggaman"
    ];
    const target = container.querySelector('#typing-text');
    const typingSpeed = 60;
    const eraseSpeed = 30;
    const delayBetween = 1500;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentText = textArray[textIndex];
      if (target) {
        if (!isDeleting && charIndex <= currentText.length) {
          target.innerHTML = currentText.substring(0, charIndex).replace(/\n/g, '<br />');
          charIndex++;
          setTimeout(typeLoop, typingSpeed);
        } else if (isDeleting && charIndex >= 0) {
          target.innerHTML = currentText.substring(0, charIndex).replace(/\n/g, '<br />');
          charIndex--;
          setTimeout(typeLoop, eraseSpeed);
        } else {
          if (!isDeleting) {
            isDeleting = true;
            setTimeout(typeLoop, delayBetween);
          } else {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            setTimeout(typeLoop, typingSpeed);
          }
        }
      }
    }

    typeLoop();
  }
};



export default LandingPage;


// KODE UJICOBA