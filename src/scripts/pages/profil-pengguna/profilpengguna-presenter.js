import React, { useState } from 'react';

const ProfilPenggunaPresenter = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(''); // Menambahkan state untuk gambar profil

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !dob || !gender || !email) {
      alert('Semua kolom harus diisi!');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('dob', dob);
    formData.append('gender', gender);
    formData.append('email', email);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await fetch('/api/saveProfile', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert('Profil berhasil disimpan!');
      } else {
        alert('Gagal menyimpan profil.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan, coba lagi.');
    }
  };

  const handleReset = () => {
    setName('');
    setDob('');
    setGender('');
    setEmail('');
    setProfileImage(''); // Reset gambar profil
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Update gambar profil
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>Profil Pengguna</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nama
          <input
            type="text"
            placeholder="Masukkan Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Tanggal Lahir
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </label>
        <label>
          Gender
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Pilih Gender</option>
            <option value="male">Laki-laki</option>
            <option value="female">Perempuan</option>
          </select>
        </label>
        <label>
          Email
          <input
            type="email"
            placeholder="Masukkan Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Gambar Profil
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {profileImage && <img src={profileImage} alt="Profile" className="profile-image" />}
        </label>
        <button type="submit">Simpan</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
    </div>
  );
};

export default ProfilPenggunaPresenter;
