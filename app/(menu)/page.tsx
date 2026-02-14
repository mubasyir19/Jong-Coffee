"use client";

import CardProduct from "@/components/molecules/CardProduct";
import { clickersript } from "@/lib/font";
import { menuCoffe } from "@/lib/menu";
import { useState } from "react";

const tabs = [...new Set(menuCoffe.map((item) => item.category))];

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProduct =
    activeTab === "All"
      ? menuCoffe
      : menuCoffe.filter((item) => item.category === activeTab);

  return (
    <div className="">
      <section className="h-screen w-full bg-[url('/images/banner.png')] bg-cover bg-position-[calc(60%+20px)_50%]">
        <div className="h-full w-full bg-linear-to-r from-black to-transparent">
          <div className="container mx-auto flex h-full items-center px-6">
            <div className="">
              <p className={`text-lg font-semibold text-white lg:text-2xl`}>
                Selamat Datang di
              </p>
              <h1
                className={`${clickersript.className} my-6 text-9xl text-white`}
              >
                Jong <br /> <span className="text-accent">Coffee</span>
              </h1>
              <p className="text-sm text-white md:w-3/4 md:text-base">
                Lebih dari sekadar kafe, ini adalah ruang untuk setiap cerita
                yang belum tuntas. Karena di sini, kopi hanyalah pemantik,
                sisanya adalah tentang kita dan sejuta narasi.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black">
        <div className="container mx-auto px-6 py-24">
          <h1 className="text-center text-2xl text-white">
            Variant Menu{" "}
            <span className={`${clickersript.className} text-accent text-4xl`}>
              Jong Coffee
            </span>
          </h1>
          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setActiveTab("All")}
                className={`rounded-full border px-3 py-1 text-sm text-white ${activeTab === "All" ? "border-accent bg-accent" : "border-gray-500 bg-white/10"}`}
              >
                All Variant
              </button>
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(tab)}
                  className={`hover:border-accent hover:bg-accent cursor-pointer rounded-full border px-3 py-1 text-sm text-white transition-all duration-300 ${activeTab === tab ? "border-accent bg-accent" : "border-gray-500 bg-white/10"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {filteredProduct.map((menu) => (
                <CardProduct
                  key={menu.id}
                  category={menu.category}
                  name={menu.name}
                  imageUrl={menu.imageUrl}
                  description={menu.description}
                  variant={menu.variant}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black">
        <div className="container mx-auto px-6 py-24">
          <div className="grid grid-cols-1 items-stretch gap-12 md:grid-cols-3">
            <div className="mx-auto aspect-9/16 w-full max-w-sm">
              <iframe
                src="https://www.instagram.com/reel/DUcXjZLk7xe/embed"
                className="h-full w-full rounded-2xl border-2 border-white"
                frameBorder="0"
                scrolling="no"
              ></iframe>
            </div>
            <div className="mx-auto aspect-9/16 w-full max-w-sm">
              <iframe
                src="https://www.instagram.com/reel/DUhr5cwk08J/embed"
                className="h-full w-full rounded-2xl border-2 border-white"
                frameBorder="0"
                scrolling="no"
              ></iframe>
            </div>
            <div className="mx-auto aspect-9/16 w-full max-w-sm">
              <iframe
                src="https://www.instagram.com/reel/DUkFpf-kxCl/embed"
                className="h-full w-full rounded-2xl border-2 border-white"
                frameBorder="0"
                scrolling="no"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
