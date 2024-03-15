import instance from "@/lib/axios/instance";

// Objek layanan otentikasi
const usersServices = {
  // Metode untuk mendapatkan semua data user
  getAllUsers: () => instance.get("/api/users"),
  // Metode untuk update data user
  updateUser: (id: string, data: any) =>
    instance.put("/api/users", { id, data }),
  // Metode untuk delete data user
  deleteUser: (id: string) => instance.delete(`/api/users/${id}`),
};

export default usersServices;
