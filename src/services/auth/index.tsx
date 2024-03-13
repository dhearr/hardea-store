import instance from "@/lib/axios/instance";

// Objek layanan otentikasi
const authServices = {
  // Metode untuk mendaftar akun baru
  registerAccount: (data: any) => instance.post("/api/users/register", data),
};

export default authServices;
