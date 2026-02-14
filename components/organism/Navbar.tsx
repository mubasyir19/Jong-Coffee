"use client";

import { Menu, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { clickersript } from "@/lib/font";
import { useAppSelector } from "@/store/hooks";
import { selectCartCount, selectCartItems } from "@/store/cartSlice";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const count = useAppSelector(selectCartItems);

  const handleOpenMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed top-0 z-50 w-full">
      <div className="relative container mx-auto flex items-center justify-between px-6 py-4">
        <div className="">
          <h1 className={`${clickersript.className} text-xl text-white`}>
            Jong Coffee
          </h1>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
          <li>
            <Link href={`/`} className="cursor-pointer text-white">
              Beranda
            </Link>
          </li>
          <li>
            <Link href={`#`} className="cursor-pointer text-white">
              Tentang Kami
            </Link>
          </li>
          <li>
            <Link href={`#menu`} className="cursor-pointer text-white">
              Menu
            </Link>
          </li>
          <li>
            <Link href={`#kontak`} className="cursor-pointer text-white">
              Kontak
            </Link>
          </li>
        </ul>
        <div className="hidden items-center gap-4 md:flex">
          <div className="relative">
            <Link href="/cart">
              <ShoppingCart className="size-6 text-white" />
              <div className="absolute top-0 -right-1 flex size-5 h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                {count.length}
              </div>
            </Link>
          </div>
          <Link href={`/login`}>
            <Button variant={"thrid"} size={"sm"}>
              Login
            </Button>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={handleOpenMenu}>
            <Menu className="size-6 text-white" />
          </button>
          {menuOpen && (
            <div
              className={`absolute inset-y-0 right-0 z-10 w-3/4 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
              <div className="h-screen bg-black py-4 text-right">
                <div className="px-6">
                  <button onClick={handleOpenMenu}>
                    <X className="size-6 text-white" />
                  </button>
                </div>
                <ul className="mt-4">
                  <Link
                    href="/"
                    className={`text-accent bg-accent/30 hover:bg-accent/30 block px-6 py-2 text-justify text-sm transition-all duration-300`}
                  >
                    Beranda
                  </Link>
                  <Link
                    href="/"
                    className={`hover:bg-accent/30 block px-6 py-2 text-justify text-sm text-white transition-all duration-300`}
                  >
                    Tentang Kami
                  </Link>
                  <Link
                    href="/"
                    className={`hover:bg-accent/30 block px-6 py-2 text-justify text-sm text-white transition-all duration-300`}
                  >
                    Menu
                  </Link>
                  <Link
                    href="/"
                    className={`hover:bg-accent/30 block px-6 py-2 text-justify text-sm text-white transition-all duration-300`}
                  >
                    Kontak
                  </Link>
                </ul>
                <div className="mt-8 flex flex-col gap-3 px-6">
                  <Link href={`/cart`}>
                    <button className="relative flex w-full items-center justify-center gap-2 rounded-md border border-gray-500 py-2 text-center text-sm text-white">
                      <ShoppingCart className="size-5" />
                      <span>Keranjang</span>
                      <span className="absolute right-4 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {count.length}
                      </span>
                    </button>
                  </Link>
                  <Link href={`/login`}>
                    <button className="bg-accent flex w-full items-center justify-center gap-2 rounded-md py-2 text-center text-sm text-white">
                      <User className="size-5 text-white" />
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
