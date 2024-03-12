import { login } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

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
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        // Jika autentikasi dilakukan menggunakan kredensial
        token.email = user.email; // Menambahkan email ke token
        token.fullname = user.fullname; // Menambahkan fullname ke token
        token.phone = user.phone; // Menambahkan phone ke token
        token.role = user.role; // Menambahkan role ke token
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
      return session; // Mengembalikan session
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
