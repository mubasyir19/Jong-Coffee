"use client";

import { createSlug } from "@/helpers/slug";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/cartSlice";
import { toast } from "sonner";

type VariantProduct = {
  name: string;
  price: number;
};

interface CardProductProps {
  name: string;
  imageUrl: string;
  category: string;
  description: string;
  variant: VariantProduct[];
}

export default function CardProduct({
  name,
  imageUrl,
  variant,
  description,
  category,
}: CardProductProps) {
  const [activeVariant, setActiveVariant] = useState(variant[0]);
  const dispatch = useAppDispatch();

  return (
    <div
      id="card-menu"
      className="hover:shadow-accent/50 flex h-full flex-col overflow-hidden rounded-lg shadow-xl shadow-black/50 transition-all duration-300"
    >
      <Image
        src={`${imageUrl ? imageUrl : "/images/menu/gula-aren.jpeg"}`}
        width={700}
        height={700}
        alt="menu"
        className="h-60 object-cover"
      />

      <div className="flex grow flex-col px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-semibold text-white">{name}</h1>
          <p className="text-accent text-sm">
            Rp {activeVariant.price.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {variant.map((item, i) => {
            const isActive = activeVariant.name === item.name;
            return (
              <button
                key={i}
                onClick={() => setActiveVariant(item)}
                className={`hover:bg-accent/20 hover:border-accent cursor-pointer rounded-sm border-2 px-2 py-1 text-xs text-white transition-all duration-300 ${isActive ? "bg-accent/20 border-accent" : "border-gray-500 bg-white/10"}`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="mt-auto flex gap-3 pt-4">
          <Link href={`/menu/${createSlug(name)}`} className="grow">
            <button className="w-full cursor-pointer rounded-md border border-gray-500 py-2 text-center text-sm text-white transition-colors hover:bg-white/10">
              Lihat Detail
            </button>
          </Link>
          <button
            onClick={() => {
              const payload = {
                id: `${createSlug(name)}`,
                name,
                imageUrl,
                variant: activeVariant.name,
                price: activeVariant.price,
                quantity: 1,
              };
              dispatch(addItem(payload));
              toast.success("Menambahkan 1 item ke keranjang");
            }}
            className="bg-accent/50 hover:bg-accent/70 shrink-0 rounded-md px-3 py-2 text-sm text-white"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
