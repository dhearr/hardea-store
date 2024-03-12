import {
  addDoc, // Fungsi untuk menambahkan dokumen baru ke koleksi
  collection, // Fungsi untuk mendapatkan referensi ke koleksi
  doc, // Fungsi untuk mendapatkan referensi ke dokumen
  getDoc, // Fungsi untuk mendapatkan dokumen tunggal
  getDocs, // Fungsi untuk mendapatkan sekumpulan dokumen
  getFirestore, // Fungsi untuk mendapatkan instance Firestore
  query, // Fungsi untuk membuat query
  where, // Fungsi untuk menentukan kondisi pada query
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt"; // Import modul bcrypt untuk hashing password

// Mendapatkan instance Firestore
const firestore = getFirestore(app);

// Fungsi untuk mengambil semua data dari sebuah koleksi
export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName)); // Mengambil snapshot dari koleksi
  const data = snapshot.docs.map((doc) => ({
    id: doc.id, // Mengambil ID dokumen
    ...doc.data(), // Mengambil data dari dokumen
  }));
  return data; // Mengembalikan data
}

// Fungsi untuk mengambil data berdasarkan ID dari sebuah koleksi
export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id)); // Mengambil snapshot dari dokumen
  const data = snapshot.data(); // Mengambil data dari snapshot
  return data; // Mengembalikan data
}

// Fungsi untuk melakukan registrasi pengguna baru
export async function register(
  userData: {
    email: string;
    fullname: string;
    phone: string;
    password: string;
    role?: string;
  },
  callback: Function // Callback untuk menangani hasil operasi
) {
  const q = query(
    collection(firestore, "users"), // Mengambil referensi koleksi "users"
    where("email", "==", userData.email) // Menambahkan kondisi bahwa email harus sama dengan email yang diberikan
  );

  const snapshot = await getDocs(q); // Mendapatkan snapshot dari hasil query
  const data = snapshot.docs.map((doc) => ({
    id: doc.id, // Mengambil ID dokumen
    ...doc.data(), // Mengambil data dari dokumen
  }));

  if (data.length > 0) {
    // Jika data ditemukan dengan email yang sama, panggil callback dengan false
    callback(false);
  } else {
    // Jika tidak ada data yang ditemukan, lanjutkan dengan proses registrasi
    if (!userData.role) {
      userData.role = "member"; // Jika peran tidak ditentukan, set peran sebagai "member" secara default
    }

    userData.password = await bcrypt.hash(userData.password, 10); // Hash password sebelum disimpan ke database

    await addDoc(collection(firestore, "users"), userData) // Tambahkan data pengguna baru ke koleksi "users"
      .then(() => {
        callback(true); // Panggil callback dengan true untuk menandakan registrasi berhasil
      })
      .catch((error) => {
        callback(false); // Panggil callback dengan false dan log error jika terjadi kesalahan
        console.log(error);
      });
  }
}

// Fungsi untuk melakukan login
export async function login(email: string) {
  const q = query(
    collection(firestore, "users"), // Mengambil referensi koleksi "users"
    where("email", "==", email) // Menambahkan kondisi bahwa email harus sama dengan email yang diberikan
  );

  const snapshot = await getDocs(q); // Mendapatkan snapshot dari hasil query
  const data = snapshot.docs.map((doc) => ({
    id: doc.id, // Mengambil ID dokumen
    ...doc.data(), // Mengambil data dari dokumen
  }));

  if (data) {
    return data[0]; // Jika data ditemukan, kembalikan data pertama dari array
  } else {
    return null; // Jika tidak ada data yang ditemukan, kembalikan null
  }
}

export async function loginWithGoogle(data: any, callback: Function) {
  const q = query(
    collection(firestore, "users"), // Mengambil referensi koleksi "users"
    where("email", "==", data.email) // Menambahkan kondisi bahwa email harus sama dengan email yang diberikan
  );

  const snapshot = await getDocs(q); // Mendapatkan snapshot dari hasil query
  const user = snapshot.docs.map((doc) => ({
    id: doc.id, // Mengambil ID dokumen
    ...doc.data(), // Mengambil data dari dokumen
  }));

  // Memeriksa apakah pengguna sudah terdaftar berdasarkan hasil query
  if (user.length > 0) {
    // Jika pengguna sudah terdaftar, memanggil callback dengan data pengguna yang ditemukan
    callback(user[0]);
  } else {
    // Jika pengguna belum terdaftar
    // Menetapkan peran (role) default sebagai "member" untuk data pengguna yang baru
    data.role = "member";

    // Menambahkan data pengguna baru ke koleksi pengguna di firestore
    await addDoc(collection(firestore, "users"), data)
      .then(() => {
        // Jika penambahan data berhasil, memanggil callback dengan data pengguna yang baru ditambahkan
        callback(data);
      })
      .catch((error) => {
        // Menangani kesalahan jika terjadi error saat menambahkan data pengguna
        console.log(error);
      });
  }
}
