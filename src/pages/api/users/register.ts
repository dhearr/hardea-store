import type { NextApiRequest, NextApiResponse } from "next";
import { register } from "@/lib/firebase/service";

// Fungsi handler untuk menangani permintaan API
export default async function handler(
  req: NextApiRequest, // Objek request dari client
  res: NextApiResponse // Objek respons yang akan dikirimkan ke client
) {
  if (req.method === "POST") {
    // Jika metode permintaan adalah POST
    // Memanggil fungsi register dengan data yang diterima dari body request
    await register(req.body, (status: boolean) => {
      if (status) {
        // Jika registrasi berhasil
        // Mengirimkan respons status 200 (OK) dengan pesan berhasil
        res
          .status(200)
          .json({ status: true, statusCode: 200, message: "success" });
      } else {
        // Jika registrasi gagal
        // Mengirimkan respons status 400 (Bad Request) dengan pesan gagal
        res
          .status(400)
          .json({ status: false, statusCode: 400, message: "failed" });
      }
    });
  } else {
    // Jika metode permintaan bukan POST
    // Mengirimkan respons status 405 (Method Not Allowed) dengan pesan metode tidak diizinkan
    res
      .status(405)
      .json({ status: false, statusCode: 405, message: "method not allowed" });
  }
}
