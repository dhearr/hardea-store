import instance from "@/lib/axios/instance";

// Objek layanan otentikasi
const productsServices = {
  // Metode untuk mendapatkan semua data product
  getAllProducts: () => instance.get("/api/products"),

  // Metode untuk menambahkan data product
  addProduct: (data: any, token: string) =>
    instance.post("/api/products", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  // Method untuk mengupdate data product
  updateProduct: (id: string, data: any, token: string) =>
    instance.put(
      `/api/products/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ),

  // Metode untuk delete data product
  deleteProduct: (id: string, token: string) =>
    instance.delete(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token ke headers
      },
    }),
};

export default productsServices;
