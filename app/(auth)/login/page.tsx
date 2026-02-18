"use client";

import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginWithGoogle } from "@/hooks/loginWithGoogle";
import { useLogin } from "@/hooks/useLogin";
import { clickersript } from "@/lib/font";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const { actionLogin, loading, error } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formLogin.email || !formLogin.password) {
        toast.error("Silakan isi form dengan lengkap");
        return;
      }

      const res = await signIn("credentials", {
        email: formLogin.email,
        password: formLogin.password,
        redirect: false, // Menghindari reload halaman otomatis
      });

      if (res?.error) {
        // Error ini datang dari return null di callback authorize
        toast.error("Email atau password salah");
        // setLoading(false);
      } else {
        toast.success("Berhasil login");

        // Beri jeda sedikit agar toast terlihat, lalu arahkan ke home/dashboard
        setTimeout(() => {
          router.push("/");
          router.refresh(); // Penting: memicu server component untuk mengambil session baru
        }, 500);
      }

      // const payloadLogin = {
      //   email: formLogin.email,
      //   password: formLogin.password,
      // };

      // await actionLogin(payloadLogin);
      // toast.success("Berhasil login");

      // setTimeout(() => {
      //   router.push("/");
      // }, 500);
    } catch (error) {
      toast.error((error as Error).message || "Gagal Login");
    }
  };

  return (
    <div className="h-screen bg-[url('/images/login.jpg')] bg-cover bg-center">
      <div className="flex h-full w-full flex-col items-center justify-center bg-black/50 p-6">
        <div className="mx-auto h-fit w-full rounded-lg border border-gray-700 bg-black/20 px-4 py-6 backdrop-blur-lg md:w-1/2 lg:w-2/6">
          <div className="text-center">
            <h1
              className={`text-4xl font-semibold text-white ${clickersript.className}`}
            >
              Selamat Datang
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Silakan login terlebih dahulu{" "}
            </p>
          </div>
          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <FieldLabel htmlFor="email" className="text-white">
                Email Address
              </FieldLabel>
              <Input
                type="email"
                name="email"
                value={formLogin.email}
                onChange={handleChange}
                placeholder="jhondoe@mail.com"
                className="text-white placeholder:text-sm"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password" className="text-white">
                  Password
                </FieldLabel>
                <Link href={`#`}>
                  <p className="text-accent text-xs md:text-sm">
                    Forgot Password?
                  </p>
                </Link>
              </div>
              <Input
                type="password"
                name="password"
                value={formLogin.password}
                onChange={handleChange}
                placeholder="******"
                className="text-white placeholder:text-sm"
              />
            </div>
            <div className="">
              <Button
                onClick={handleSubmit}
                variant={"thrid"}
                size={"lg"}
                className="w-full text-white"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign In to Your Account"}
              </Button>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-center text-sm text-white">
              Belum punya akun?
              <Link
                href={`/register`}
                className="text-accent ml-1.5 font-medium"
              >
                Daftar
              </Link>
            </p>
          </div>
          <div className="my-5 text-center">
            <p className="grow text-sm text-gray-400">Atau login dengan</p>
          </div>
          <form action={loginWithGoogle}>
            <button
              type="submit"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-gray-700 bg-white/10 px-6 backdrop-blur-3xl transition-all hover:bg-white/20"
            >
              <Image
                src={`/icons/google.svg`}
                width={20}
                height={20}
                alt="google"
                className="size-5"
              />
              <p className="text-white">Google</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
