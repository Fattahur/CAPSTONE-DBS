import React from 'react';

const ProfilPenggunaPresenter = ({ name, dob, gender, email, onNameChange, onDobChange, onGenderChange, onEmailChange, onSubmit }) => (
  <div>
    <h1>Profil Pengguna</h1>
    <form onSubmit={onSubmit}>
      <label>
        Nama
        <input
          type="text"
          placeholder="Masukkan Nama"
          value={name}
          onChange={onNameChange}
        />
      </label>
      <label>
        Tanggal Lahir
        <input
          type="date"
          value={dob}
          onChange={onDobChange}
        />
      </label>
      <label>
        Gender
        <select
          value={gender}
          onChange={onGenderChange}
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
          onChange={onEmailChange}
        />
      </label>
      <button type="submit">Simpan</button>
    </form>
  </div>
);

export default ProfilPenggunaPresenter;
