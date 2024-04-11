import instance from "@/lib/axios/instance";

// Objek layanan otentikasi
const productsServices = {
  // Metode untuk mendapatkan semua data product
  getAllProducts: () => instance.get("/api/products"),
};

export default productsServices;
