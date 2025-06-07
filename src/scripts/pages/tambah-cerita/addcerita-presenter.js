// // src/scripts/pages/add-cerita/add-cerita-presenter.js
// import TambahCeritaModel from '../../models/tambahCeritaModel';

// const AddCeritaPresenter = {
//   async init() {
//     this._form = document.getElementById('story-form');
//     this._title = document.getElementById('title');
//     this._category = document.getElementById('category');
//     this._description = document.getElementById('description');
//     this._uploadBtn = document.getElementById('upload-img-btn');
//     this._fileUpload = document.getElementById('file-upload');
//     this._startCameraBtn = document.getElementById('start-camera-btn');
//     this._cancelCameraBtn = document.getElementById('cancel-camera-btn');
//     this._captureBtn = document.getElementById('capture-btn');
//     this._video = document.getElementById('camera-preview');
//     this._imagePreview = document.getElementById('image-preview');
//     this._mapContainer = document.getElementById('map-container');
//     this._map = document.getElementById('map');
//     this._submitBtn = document.querySelector('button[type="submit"]');
//     this._cameraPreviewContainer = document.getElementById('camera-preview-container');

//     this._selectedLocation = null;
//     this._stream = null;
//     this._imageFile = null;
//     this._isCameraActive = false;

//     this._bindEvents();
//     this._updateUI();
//   },

//   _bindEvents() {
//     this._form.addEventListener('submit', (e) => this._handleSubmit(e));
//     this._uploadBtn.addEventListener('click', () => this._fileUpload.click());
//     this._fileUpload.addEventListener('change', (e) => this._handleFileUpload(e));
//     this._startCameraBtn.addEventListener('click', () => this._startCamera());
//     this._cancelCameraBtn.addEventListener('click', () => this._stopCamera());
//     this._captureBtn.addEventListener('click', () => this._captureFromCamera());
//     this._map.addEventListener('click', (e) => this._selectLocation(e));
//   },

//   async _handleSubmit(e) {
//     e.preventDefault();
    
//     this._submitBtn.disabled = true;
//     this._submitBtn.textContent = 'Mengirim...';

//     try {
//       const title = this._title.value.trim();
//       const category = this._category.value;
//       const description = this._description.value.trim();

//       if (!title) throw new Error('Judul harus diisi');
//       if (!category) throw new Error('Kategori harus dipilih');
//       if (!description) throw new Error('Deskripsi harus diisi');
//       if (!this._selectedLocation) throw new Error('Lokasi harus dipilih');

//       // Jika kamera aktif tapi belum capture gambar
//       if (this._isCameraActive && !this._imageFile) {
//         throw new Error('Silakan ambil foto terlebih dahulu');
//       }

//       const data = {
//         user_id: this._getUserId(), // Dapatkan user ID dari session/localStorage
//         judul: title,
//         kategori: category,
//         deskripsi: description,
//         lokasi: `${this._selectedLocation.lat},${this._selectedLocation.lng}`,
//         img: this._imageFile || null
//       };

//       const response = await TambahCeritaModel.kirimCerita(data);
      
//       alert('Cerita berhasil dikirim!');
//       this._resetForm();
      
//       // Redirect atau lakukan sesuatu setelah berhasil
//       // window.location.href = '/cerita-saya.html';
      
//     } catch (error) {
//       console.error('Error:', error);
//       alert(error.message || 'Gagal mengirim cerita');
//     } finally {
//       this._submitBtn.disabled = false;
//       this._submitBtn.textContent = 'Kirim Cerita';
//     }
//   },

//   _handleFileUpload(e) {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validasi file
//     if (!file.type.match('image.*')) {
//       alert('Hanya file gambar yang diperbolehkan');
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) { // 5MB
//       alert('Ukuran file maksimal 5MB');
//       return;
//     }

//     this._imageFile = file;
//     this._previewImage(file);
//     this._stopCamera(); // Matikan kamera jika aktif
//   },

//   _previewImage(file) {
//     const reader = new FileReader();
//     reader.onload = () => {
//       this._imagePreview.src = reader.result;
//       this._imagePreview.style.display = 'block';
//     };
//     reader.readAsDataURL(file);
//   },

//   async _startCamera() {
//     try {
//       this._stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { 
//           facingMode: 'environment', // Gunakan kamera belakang
//           width: { ideal: 1280 },
//           height: { ideal: 720 }
//         } 
//       });
      
//       this._video.srcObject = this._stream;
//       this._video.style.display = 'block';
//       this._isCameraActive = true;
//       this._updateUI();
      
//       // Reset file upload jika ada
//       this._fileUpload.value = '';
      
//     } catch (err) {
//       console.error('Camera error:', err);
//       alert('Tidak bisa mengakses kamera: ' + err.message);
//       this._isCameraActive = false;
//       this._updateUI();
//     }
//   },

//   _stopCamera() {
//     if (this._stream) {
//       this._stream.getTracks().forEach(track => track.stop());
//       this._video.srcObject = null;
//     }
    
//     this._isCameraActive = false;
//     this._video.style.display = 'none';
//     this._updateUI();
//   },

//   async _captureFromCamera() {
//     if (!this._stream) return;

//     try {
//       const canvas = document.createElement('canvas');
//       canvas.width = this._video.videoWidth;
//       canvas.height = this._video.videoHeight;
//       canvas.getContext('2d').drawImage(this._video, 0, 0);
      
//       canvas.toBlob((blob) => {
//         this._imageFile = new File([blob], 'camera-capture.jpg', { 
//           type: 'image/jpeg',
//           lastModified: Date.now()
//         });
        
//         this._previewImage(this._imageFile);
//         this._stopCamera();
//       }, 'image/jpeg', 0.9); // Kualitas 90%
      
//     } catch (error) {
//       console.error('Capture error:', error);
//       alert('Gagal mengambil foto: ' + error.message);
//     }
//   },

//   _selectLocation(e) {
//     const bounds = this._map.getBoundingClientRect();
//     const lat = ((e.clientY - bounds.top) / bounds.height * 180 - 90).toFixed(4);
//     const lng = ((e.clientX - bounds.left) / bounds.width * 360 - 180).toFixed(4);
    
//     this._selectedLocation = { lat, lng };
//     this._map.innerHTML = `
//       <div style="padding: 10px; text-align: center;">
//         <strong>Lokasi dipilih:</strong><br>
//         Latitude: ${lat}<br>
//         Longitude: ${lng}
//       </div>
//     `;
//   },

//   _resetForm() {
//     this._form.reset();
//     this._imagePreview.src = '';
//     this._imagePreview.style.display = 'none';
//     this._imageFile = null;
//     this._selectedLocation = null;
//     this._map.innerHTML = 'Klik untuk memilih lokasi';
//     this._stopCamera();
//   },

//   _updateUI() {
//     // Tampilkan/sembunyikan tombol berdasarkan state kamera
//     this._startCameraBtn.style.display = this._isCameraActive ? 'none' : 'block';
//     this._cancelCameraBtn.style.display = this._isCameraActive ? 'block' : 'none';
//     this._captureBtn.style.display = this._isCameraActive ? 'block' : 'none';
//     this._uploadBtn.style.display = this._isCameraActive ? 'none' : 'block';
//   },

//   _getUserId() {
//     // Implementasi untuk mendapatkan user ID
//     // Contoh sederhana, ganti dengan implementasi sesungguhnya
//     return localStorage.getItem('userId') || 1;
//   }
// };

// export default AddCeritaPresenter;
import TambahCeritaModel from '../../models/tambahCeritaModel';

const AddCeritaPresenter = {
  async init() {
    this._form = document.getElementById('story-form');
    this._title = document.getElementById('title');
    this._category = document.getElementById('category');
    this._description = document.getElementById('description');
    this._uploadBtn = document.getElementById('upload-img-btn');
    this._fileUpload = document.getElementById('file-upload');
    this._startCameraBtn = document.getElementById('start-camera-btn');
    this._cancelCameraBtn = document.getElementById('cancel-camera-btn');
    this._captureBtn = document.getElementById('capture-btn');
    this._video = document.getElementById('camera-preview');
    this._imagePreview = document.getElementById('image-preview');
    this._mapContainer = document.getElementById('map-container');
    this._map = document.getElementById('map');
    this._submitBtn = document.querySelector('button[type="submit"]');
    this._cameraPreviewContainer = document.getElementById('camera-preview-container');

    this._selectedLocation = null;
    this._stream = null;
    this._imageFile = null;
    this._isCameraActive = false;

    this._bindEvents();
    this._updateUI();
  },

  _bindEvents() {
    this._form.addEventListener('submit', (e) => this._handleSubmit(e));
    this._uploadBtn.addEventListener('click', () => this._fileUpload.click());
    this._fileUpload.addEventListener('change', (e) => this._handleFileUpload(e));
    this._startCameraBtn.addEventListener('click', () => this._startCamera());
    this._cancelCameraBtn.addEventListener('click', () => this._stopCamera());
    this._captureBtn.addEventListener('click', () => this._captureFromCamera());
    this._map.addEventListener('click', (e) => this._selectLocation(e));
  },

  async _handleSubmit(e) {
    e.preventDefault();

    this._submitBtn.disabled = true;
    this._submitBtn.textContent = 'Mengirim...';

    try {
      const title = this._title.value.trim();
      const category = this._category.value;
      const description = this._description.value.trim();

      if (!title) throw new Error('Judul harus diisi');
      if (!category) throw new Error('Kategori harus dipilih');
      if (!description) throw new Error('Deskripsi harus diisi');
      if (!this._selectedLocation) throw new Error('Lokasi harus dipilih');

      // Jika kamera aktif tapi belum capture gambar
      if (this._isCameraActive && !this._imageFile) {
        throw new Error('Silakan ambil foto terlebih dahulu');
      }

      const userId = this._getUserId();

      console.log('Data yang akan dikirim:');
      console.log('User ID:', userId);
      console.log('Judul:', title);
      console.log('Deskripsi:', description);
      console.log('Lokasi:', this._selectedLocation.lat + ', ' + this._selectedLocation.lng);
      console.log('Kategori:', category);
      console.log('Gambar:', this._imageFile);

      const data = {
        user_id: userId,
        judul: title,
        kategori: category,
        deskripsi: description,
        lokasi: `${this._selectedLocation.lat},${this._selectedLocation.lng}`,
        img: this._imageFile || null
      };

      const response = await TambahCeritaModel.kirimCerita(data);

      alert('Cerita berhasil dikirim!');
      this._resetForm();

      // window.location.href = '/cerita-saya.html';

    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Gagal mengirim cerita');
    } finally {
      this._submitBtn.disabled = false;
      this._submitBtn.textContent = 'Kirim Cerita';
    }
  },

  _handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      alert('Hanya file gambar yang diperbolehkan');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    this._imageFile = file;
    this._previewImage(file);
    this._stopCamera();
  },

  _previewImage(file) {
    const reader = new FileReader();
    reader.onload = () => {
      this._imagePreview.src = reader.result;
      this._imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  },

  async _startCamera() {
    try {
      this._stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      this._video.srcObject = this._stream;
      this._video.style.display = 'block';
      this._isCameraActive = true;
      this._updateUI();
      this._fileUpload.value = '';

    } catch (err) {
      console.error('Camera error:', err);
      alert('Tidak bisa mengakses kamera: ' + err.message);
      this._isCameraActive = false;
      this._updateUI();
    }
  },

  _stopCamera() {
    if (this._stream) {
      this._stream.getTracks().forEach(track => track.stop());
      this._video.srcObject = null;
    }

    this._isCameraActive = false;
    this._video.style.display = 'none';
    this._updateUI();
  },

  async _captureFromCamera() {
    if (!this._stream) return;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = this._video.videoWidth;
      canvas.height = this._video.videoHeight;
      canvas.getContext('2d').drawImage(this._video, 0, 0);

      canvas.toBlob((blob) => {
        this._imageFile = new File([blob], 'camera-capture.jpg', {
          type: 'image/jpeg',
          lastModified: Date.now()
        });

        this._previewImage(this._imageFile);
        this._stopCamera();
      }, 'image/jpeg', 0.9);

    } catch (error) {
      console.error('Capture error:', error);
      alert('Gagal mengambil foto: ' + error.message);
    }
  },

  _selectLocation(e) {
    const bounds = this._map.getBoundingClientRect();
    const lat = ((e.clientY - bounds.top) / bounds.height * 180 - 90).toFixed(4);
    const lng = ((e.clientX - bounds.left) / bounds.width * 360 - 180).toFixed(4);

    this._selectedLocation = { lat, lng };
    this._map.innerHTML = `
      <div style="padding: 10px; text-align: center;">
        <strong>Lokasi dipilih:</strong><br>
        Latitude: ${lat}<br>
        Longitude: ${lng}
      </div>
    `;
  },

  _resetForm() {
    this._form.reset();
    this._imagePreview.src = '';
    this._imagePreview.style.display = 'none';
    this._imageFile = null;
    this._selectedLocation = null;
    this._map.innerHTML = 'Klik untuk memilih lokasi';
    this._stopCamera();
  },

  _updateUI() {
    this._startCameraBtn.style.display = this._isCameraActive ? 'none' : 'block';
    this._cancelCameraBtn.style.display = this._isCameraActive ? 'block' : 'none';
    this._captureBtn.style.display = this._isCameraActive ? 'block' : 'none';
    this._uploadBtn.style.display = this._isCameraActive ? 'none' : 'block';
  },

  _getUserId() {
    return localStorage.getItem('userId') || 1;
  }
};

export default AddCeritaPresenter;
