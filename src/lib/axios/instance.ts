import axios from "axios";

// Setel header default untuk permintaan
const headers = {
  Accept: "application/json", // Tentukan format respons yang diinginkan
  "Content-Type": "application/json", // Tentukan format data yang dikirim
  "Cache-Control": "no-cache", // Instruksikan klien untuk tidak menyimpan respons dalam cache
  Expires: 0, // Tetapkan waktu kedaluwarsa agar tidak ada penyimpanan cache
};

// Buat instance axios dengan konfigurasi kustom
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // Tetapkan URL dasar untuk permintaan
  headers, // Berikan header default ke instance
  timeout: 60 * 1000, // Tetapkan waktu habis untuk permintaan menjadi 60 detik
});

// Intersep respons untuk menangani kesalahan atau modifikasi data respons
instance.interceptors.response.use(
  (config) => config, // Kembalikan konfigurasi respons untuk permintaan yang berhasil
  (error) => Promise.reject(error) // Tolak promise dengan kesalahan yang ditemui
);

// Intersep permintaan untuk menangani kesalahan atau modifikasi data permintaan
instance.interceptors.request.use(
  (response) => response, // Kembalikan konfigurasi permintaan untuk permintaan yang berhasil
  (error) => Promise.reject(error) // Tolak promise dengan kesalahan yang ditemui
);

export default instance;
