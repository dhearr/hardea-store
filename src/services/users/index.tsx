import instance from "@/lib/axios/instance";

// Objek layanan otentikasi
const usersServices = {
  // Metode untuk mendapatkan semua data user
  getAllUsers: () => instance.get("/api/users"),

  // Metode untuk update data user
  updateUser: (id: string, data: any, token: string) =>
    instance.put(
      `/api/users/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Menambahkan token ke headers
        },
      }
    ),

  // Metode untuk delete data user
  deleteUser: (id: string, token: string) =>
    instance.delete(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token ke headers
      },
    }),

  // Metode untuk mendapatkan profile user
  getProfile: (token: string) =>
    instance.get(`/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token ke headers
      },
    }),

  // Metode untuk update profile user
  updateProfile: (data: any, token: string) =>
    instance.put(
      `/api/users/profile`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Menambahkan token ke headers
        },
      }
    ),
};

export default usersServices;
