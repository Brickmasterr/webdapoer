### Dapoer Barokah

Dapoer Barokah adalah aplikasi web untuk manajemen dan pemesanan makanan. Proyek ini dibangun dengan menggunakan Express.js, MySQL, CORS, enkripsi password, manajemen file upload, cookies, EJS, dan dotenv sebagai techstack-nya.

#### Tech Stack:

- **Express.js**: Framework backend untuk Node.js yang powerful dan minimalis.
- **MySQL**: Database relasional untuk menyimpan data aplikasi.
- **CORS**: Memungkinkan aplikasi untuk mengakses sumber daya dari domain lain.
- **Password Encrypted**: Enkripsi password untuk keamanan pengguna.
- **Manajemen File Upload**: Middleware untuk mengelola upload file.
- **Cookies**: Untuk menyimpan informasi sesi pengguna.
- **EJS**: Engine template untuk menghasilkan HTML dengan data dari server.
- **dotenv**: Modul untuk memuat variabel lingkungan dari file `.env`.

#### Fitur Utama:

- Registrasi dan otentikasi pengguna dengan enkripsi password.
- Halaman administrasi untuk manajemen menu makanan.
- Form listing menu dengan upload gambar.
- Penanganan cookies untuk mempertahankan sesi pengguna.

---

#### Instalasi dan Penggunaan:

1. **Clone Repository:**

   ```bash
   git clone https://github.com/username/dapoer-barokah.git
   cd dapoer-barokah
   ```

2. **Instal Dependencies**

   ```bash
   npm install
   ```

3. **Setup Environment Variables:**

- Buat file `.env` di root proyek Anda berdasarkan contoh di `.env.example`.
- Isi file `.env` dengan konfigurasi variabel lingkungan seperti `DB_HOST`, `DB_USER`, `DB_PASS`, `SESSION_SECRET`, dll.

 Contoh isi `.env`:

```bash
port = 3000
dbConfig_host = 127.0.0.1
dbConfig_user = root
dbConfig_password = password
dbConfig_port = 3306
```

4. **Setup Database:**

- Buatlah database MySQL dengan nama dapoer_barokah.
- Sesuaikan koneksi database di file config/database.js.

5. **Jalankan Aplikasi:**

    ```bash
    npm start
    ```
Aplikasi akan berjalan di `http://localhost:3000`

---

### Kontribusi:
Terima kasih atas minat Anda untuk berkontribusi pada proyek Dapoer Barokah! Untuk berkontribusi, silakan lakukan langkah-langkah berikut:

    1. Fork repository ini.
    2. Buat branch baru (git checkout -b fitur-baru).
    3. Commit perubahan Anda (git commit -am 'Menambahkan fitur baru').
    4. Push ke branch Anda (git push origin fitur-baru).
    5. Ajukan pull request.

---

## Authors

- [@Brickmasterr](https://www.github.com/Brickmasterr)


## Support

For support, DM me on Discord `@brickmaster`.


## Lisensi:
Proyek ini dilisensikan di bawah [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
