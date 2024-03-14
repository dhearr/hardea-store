import { addData, retrieveDataByField } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

// Fungsi untuk melakukan registrasi pengguna baru
export async function register(
  userData: {
    email: string;
    fullname: string;
    phone: string;
    password: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
  },
  callback: Function // Callback untuk menangani hasil operasi
) {
  // Mengambil data pengguna dari koleksi "users" berdasarkan alamat email pengguna yang tersimpan di dalam database
  const data = await retrieveDataByField("users", "email", userData.email);

  if (data.length > 0) {
    // Jika data ditemukan dengan email yang sama, panggil callback dengan false
    callback(false);
  } else {
    // Jika tidak ada data yang ditemukan, lanjutkan dengan proses registrasi
    if (!userData.role) {
      userData.role = "member"; // Jika peran tidak ditentukan, set peran sebagai "member" secara default
    }

    userData.password = await bcrypt.hash(userData.password, 10); // Hash password sebelum disimpan ke database

    // Menetapkan waktu pembuatan data (created_at) dan waktu terakhir data diperbarui (updated_at) sebagai waktu saat ini.
    userData.created_at = new Date(); // Menetapkan waktu pembuatan data
    userData.updated_at = new Date(); // Menetapkan waktu terakhir data diperbarui

    // Menambahkan data pengguna baru ke koleksi "users" di database
    await addData("users", userData, (result: boolean) => {
      // Memanggil callback dengan hasil dari operasi addData
      callback(result);
    });
  }
}

// Fungsi untuk melakukan login
export async function login(email: string) {
  // Mengambil data pengguna dari koleksi "users" berdasarkan alamat email pengguna yang tersimpan di dalam database
  const data = await retrieveDataByField("users", "email", email);

  if (data) {
    return data[0]; // Jika data ditemukan, kembalikan data pertama dari array
  } else {
    return null; // Jika tidak ada data yang ditemukan, kembalikan null
  }
}

// Fungsi untuk melakukan login dengan akun google
export async function loginWithGoogle(
  data: {
    email: string;
    role?: string;
    password?: string;
    created_at?: Date;
    updated_at?: Date;
  },
  callback: Function
) {
  // Mengambil data pengguna dari koleksi "users" berdasarkan alamat email pengguna yang tersimpan di dalam database
  const user = await retrieveDataByField("users", "email", data.email);

  // Memeriksa apakah pengguna sudah terdaftar berdasarkan hasil query
  if (user.length > 0) {
    // Jika pengguna sudah terdaftar, memanggil callback dengan data pengguna yang ditemukan
    callback(user[0]);
  } else {
    // Jika pengguna belum terdaftar, Menetapkan peran (role) default sebagai "member" untuk data pengguna yang baru
    data.role = "member";

    // Menetapkan waktu pembuatan data (created_at) dan waktu terakhir data diperbarui (updated_at) sebagai waktu saat ini.
    data.created_at = new Date(); // Menetapkan waktu pembuatan data
    data.updated_at = new Date(); // Menetapkan waktu terakhir data diperbarui
    data.password = "";

    // Menambahkan data pengguna baru ke koleksi "users" di database
    await addData("users", data, (result: boolean) => {
      // Memeriksa apakah penambahan data berhasil
      if (result) {
        // Jika berhasil, panggil callback dengan data yang ditambahkan
        callback(data);
      }
    });
  }
}
