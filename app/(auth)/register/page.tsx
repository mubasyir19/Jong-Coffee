"use client";

import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/hooks/useRegister";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Register() {
  const router = useRouter();

  const [formRegist, setFormRegist] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { loading, error, actionRegister } = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormRegist((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formRegist.email ||
      !formRegist.fullname ||
      !formRegist.password ||
      !formRegist.email
    ) {
      toast.error("Silakan isi dengan lengkap");
      return;
    }

    try {
      if (formRegist.password !== formRegist.confirmPassword) {
        toast.error("Password tidak sinkron");
        return;
      }

      const payload = {
        fullname: formRegist.fullname,
        email: formRegist.email,
        password: formRegist.password,
      };

      await actionRegister(payload);
      toast.success("Berhasil daftar akun");

      setTimeout(() => {
        router.push("/login");
      }, 500);
    } catch (error) {
      toast.error((error as Error).message || "Gagal daftar akun");
    }
  };

  return (
    <div className="h-screen bg-[url('/images/login.jpg')] bg-cover bg-center">
      <div className="flex h-full w-full flex-col items-center justify-center bg-black/50 p-6">
        <div className="mx-auto h-fit w-full rounded-lg border border-gray-700 bg-black/20 px-4 py-6 backdrop-blur-lg md:w-1/2 lg:w-2/6">
          <div className="text-center">
            <h1 className={`text-4xl font-semibold text-white`}>Daftar Akun</h1>
            <p className="mt-2 text-sm text-gray-400">
              Silakan isi form sebagai berikut
            </p>
          </div>
          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <FieldLabel htmlFor="email" className="text-white">
                Nama Lengkap
              </FieldLabel>
              <Input
                type="text"
                name="fullname"
                placeholder="Jhon Doe"
                value={formRegist.fullname}
                onChange={handleChange}
                className="text-white placeholder:text-sm"
              />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="email" className="text-white">
                Email
              </FieldLabel>
              <Input
                type="email"
                name="email"
                placeholder="jhondoe@mail.com"
                value={formRegist.email}
                onChange={handleChange}
                className="text-white placeholder:text-sm"
              />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="email" className="text-white">
                Password
              </FieldLabel>
              <Input
                type="password"
                name="password"
                placeholder="********"
                value={formRegist.password}
                onChange={handleChange}
                className="text-white placeholder:text-sm"
              />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="email" className="text-white">
                Konfirmasi Password
              </FieldLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={formRegist.confirmPassword}
                onChange={handleChange}
                placeholder="********"
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
                {loading ? "Loading..." : "Daftar Akun"}
              </Button>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-center text-sm text-white">
              Sudah punya akun?
              <Link href={`/login`} className="text-accent ml-1.5 font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
