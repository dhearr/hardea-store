import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { retrieveDataById, updateData } from "@/lib/firebase/service";

// Fungsi handler untuk menangani permintaan API
export default async function handler(
  req: NextApiRequest, // Objek request dari client
  res: NextApiResponse // Objek respons yang akan dikirimkan ke client
) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decoded: any) => {
          if (decoded) {
            const profile: any = await retrieveDataById("users", decoded.id);
            if (profile) {
              profile.id = decoded.id;
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success",
                data: profile,
              });
            } else {
              res.status(404).json({
                status: false,
                statusCode: 404,
                message: "not found",
                data: {},
              });
            }
          } else {
            res.status(403).json({
              status: false,
              statusCode: 403,
              message: "access denied",
              data: {},
            });
          }
        }
      );
    }
  } else if (req.method === "PUT") {
    const { users }: any = req.query;
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          await updateData("users", users[0], data, (result: boolean) => {
            if (result) {
              res
                .status(200)
                .json({ status: true, statusCode: 200, message: "success" });
            } else {
              res
                .status(400)
                .json({ status: false, statusCode: 400, message: "failed" });
            }
          });
        } else {
          res
            .status(403)
            .json({ status: false, statusCode: 403, message: "access denied" });
        }
      }
    );
  }
}
