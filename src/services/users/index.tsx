import instance from "@/lib/axios/instance";

// Objek layanan otentikasi
const usersServices = {
  // Metode untuk mendapatkan semua data user
  getAllUsers: () => instance.get("/api/users"),
};

export default usersServices;
