import {
  addDoc, // Fungsi untuk menambahkan data ke koleksi
  collection, // Fungsi untuk mendapatkan referensi ke koleksi
  doc, // Fungsi untuk mendapatkan referensi ke dokumen
  getDoc, // Fungsi untuk mendapatkan dokumen tunggal
  getDocs, // Fungsi untuk mendapatkan sekumpulan dokumen
  getFirestore, // Fungsi untuk mendapatkan instance Firestore
  query, // Fungsi untuk membuat query
  where, // Fungsi untuk menentukan kondisi pada query
} from "firebase/firestore";
import app from "./init";

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

// Fungsi untuk mengambil data dari koleksi Firestore berdasarkan nilai tertentu dari sebuah field.
export async function retrieveDataByField(
  collectionName: string,
  field: string,
  value: string
) {
  // Membuat query Firestore untuk mendapatkan dokumen berdasarkan field dan nilai yang diberikan
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value)
  );

  // Mendapatkan snapshot dari hasil query
  const snapshot = await getDocs(q);

  // Mengambil data dari setiap dokumen dalam snapshot
  const data = snapshot.docs.map((doc) => ({
    id: doc.id, // Mengambil ID dokumen
    ...doc.data(), // Mengambil data dari dokumen
  }));

  return data;
}

export async function addData(
  collectionName: string,
  data: any,
  callback: Function
) {
  await addDoc(collection(firestore, collectionName), data)
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false);
      console.log(error);
    });
}
