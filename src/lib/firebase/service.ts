import {
  addDoc, // Fungsi untuk menambahkan data ke koleksi
  collection, // Fungsi untuk mendapatkan referensi ke koleksi
  deleteDoc, // Fungsi untuk menghapus data
  doc, // Fungsi untuk mendapatkan referensi ke dokumen
  getDoc, // Fungsi untuk mendapatkan dokumen tunggal
  getDocs, // Fungsi untuk mendapatkan sekumpulan dokumen
  getFirestore, // Fungsi untuk mendapatkan instance Firestore
  query, // Fungsi untuk membuat query
  updateDoc, // Fungsi mengupdate data
  where, // Fungsi untuk menentukan kondisi pada query
} from "firebase/firestore";
import app from "./init";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

// Mendapatkan instance Firestore
const firestore = getFirestore(app);

// Mendapatkan instance Firebase Storage
const storage = getStorage(app);

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

// Fungsi untuk menambahkan data ke koleksi
export async function addData(
  collectionName: string,
  data: any,
  callback: Function
) {
  // Menambahkan data ke koleksi
  await addDoc(collection(firestore, collectionName), data)
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false);
    });
}

// Fungsi untuk mengupdate data
export async function updateData(
  collectionName: string,
  id: string,
  data: any,
  callback: Function
) {
  // Mengupdate data
  const docRef = doc(firestore, collectionName, id);
  await updateDoc(docRef, data)
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false);
    });
}

// Fungsi untuk menghapus data
export async function deleteData(
  collectionName: string,
  id: string,
  callback: Function
) {
  // Menghapus data
  const docRef = doc(firestore, collectionName, id);
  await deleteDoc(docRef)
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false);
    });
}

export async function uploadFile(
  userid: string,
  file: any,
  callback: Function
) {
  if (file) {
    if (file.size < 1048576) {
      const newName = "profile." + file.name.split(".")[1];
      const storageRef = ref(storage, `images/users/${userid}/${newName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progres =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            callback(downloadURL);
          });
        }
      );
    } else {
      return false;
    }
  }
}
