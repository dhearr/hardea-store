import { login, loginWithGoogle } from "@/services/auth/services";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

// Opsi konfigurasi NextAuth
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", // Menggunakan strategi jwt untuk sesi
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials", // Menentukan tipe provider sebagai credentials
      name: "Credentials", // Nama provider
      credentials: {
        email: { label: "Email", type: "email" }, // Menentukan label dan tipe input untuk email
        password: { label: "Password", type: "password" }, // Menentukan label dan tipe input untuk password
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          // Mendapatkan email dan password dari credentials
          email: string;
          password: string;
        };
        const user: any = await login(email); // Menggunakan fungsi login untuk mencari user berdasarkan email
        if (user) {
          // Jika user ditemukan
          const passwordConfirm = await compare(password, user.password); // Membandingkan password yang diinput dengan password di database
          if (passwordConfirm) {
            // Jika password cocok
            return user; // Mengembalikan user
          }
          return null; // Jika password tidak cocok, mengembalikan null
        } else {
          return null; // Jika user tidak ditemukan, mengembalikan null
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        // Jika autentikasi dilakukan menggunakan kredensial
        token.email = user.email; // Menambahkan email ke token
        token.fullname = user.fullname; // Menambahkan fullname ke token
        token.phone = user.phone; // Menambahkan phone ke token
        token.role = user.role; // Menambahkan role ke token
        token.id = user.id; // Menambahkan id ke token
        token.image = user.image; // Menambahkan image ke token
      }

      if (account?.provider === "google") {
        // Jika autentikasi dilakukan melalui Google
        const data = {
          fullname: user.name, // Mengambil nama lengkap dari user yang didapatkan dari Google
          email: user.email, // Mengambil alamat email dari user yang didapatkan dari Google
          image: user.image, // Mengambil gambar profil dari user yang didapatkan dari Google
          type: "google", // Menentukan tipe autentikasi sebagai Google
        };

        // Memanggil fungsi loginWithGoogle untuk menangani autentikasi melalui Google
        await loginWithGoogle(data, (data: any) => {
          // Jika autentikasi berhasil, mengatur token dengan data yang diperoleh
          token.email = data.email; // Menambahkan alamat email ke token
          token.fullname = data.fullname; // Menambahkan nama lengkap ke token
          token.role = data.role; // Menambahkan peran (role) ke token
          token.image = data.image; // Menambahkan gambar profil ke token
          token.id = data.id; // Menambahkan id ke token
        });
      }
      return token; // Mengembalikan token
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        // Jika email ada di dalam token
        session.user.email = token.email; // Menambahkan email ke session user
      }
      if ("fullname" in token) {
        // Jika fullname ada di dalam token
        session.user.fullname = token.fullname; // Menambahkan fullname ke session user
      }
      if ("phone" in token) {
        // Jika phone ada di dalam token
        session.user.phone = token.phone; // Menambahkan phone ke session user
      }
      if ("role" in token) {
        // Jika role ada di dalam token
        session.user.role = token.role; // Menambahkan role ke session user
      }
      if ("id" in token) {
        // Jika id ada di dalam token
        session.user.id = token.id; // Menambahkan id ke session user
      }
      if ("image" in token) {
        // Jika image ada di dalam token
        session.user.image = token.image; // Menambahkan image ke session user
      }

      // Mengenerate token
      const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || "", {
        algorithm: "HS256", // Menggunakan algoritma HS256
      });

      // Menambahkan token ke session
      session.accessToken = accessToken;

      return session; // Mengembalikan session
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
