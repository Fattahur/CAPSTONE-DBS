import AddProfileModel from '../../models/addprofileModel'; // Mengimpor model

export default class ProfilPenggunaPresenter {
  constructor(view) {
    this.view = view;
    this.name = '';
    this.dob = '';
    this.gender = '';
    this.phoneNumber = '';
    this.address = '';
    this.profileImage = ''; // Menambahkan properti untuk gambar profil
  }

  // Fungsi untuk mengupdate profil pengguna
  async handleSubmit(e, name, dob, gender, phoneNumber, address, profileImage) {
    e.preventDefault();

    // Validasi input form
    if (!name || !dob || !gender || !phoneNumber || !address) {
      alert("Semua kolom harus diisi!");
      return;
    }

    // Menyiapkan data form untuk dikirim ke API
    const profileData = {
      user_id: 5,  // ID pengguna (misalnya ID dari login session atau data dari server)
      nama_lengkap: name,
      photo_profile: profileImage || "https://example.com/foto.jpg",  // Gambar profil jika ada, atau gambar default
      no_telepon: phoneNumber || "08123456789",  // No telepon
      alamat: address || "Jl. Merdeka No. 45, Kediri",  // Alamat
      tanggal_lahir: dob,
      jenis_kelamin: gender === 'male' ? 'L' : 'P',  // Mengubah gender ke 'L' atau 'P'
      status_aktif: 1  // Status aktif
    };

    // Mengirimkan data ke API
    this.updateProfile(profileData);
  }

  // Fungsi untuk mengirim data ke API
  async updateProfile(profileData) {
    const profileModel = new AddProfileModel();  // Pastikan menggunakan nama model yang benar
    try {
      const result = await profileModel.addProfile(profileData);  // Mengirim data profile ke model

      // Menangani respons yang datang
      if (result.success) {
        alert(result.message);  // Menampilkan pesan sukses
      } else {
        alert(result.message);  // Menampilkan pesan error
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat memperbarui profil.');
    }
  }

  // Fungsi untuk mereset form
  handleReset() {
    this.view.name = '';
    this.view.dob = '';
    this.view.gender = '';
    this.view.phoneNumber = '';
    this.view.address = '';
    this.view.profileImage = ''; // Reset gambar profil
    this.view.render(document.getElementById('profileContainer')); // Render ulang tampilan setelah reset
  }

  // Fungsi untuk menangani perubahan gambar
  handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.view.profileImage = reader.result; // Update gambar profil
        this.view.render(document.getElementById('profileContainer')); // Memanggil render dengan container yang valid
      };
      reader.readAsDataURL(file);
    }
  }
}
