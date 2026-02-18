"use client";

import { deSlug, createSlug } from "@/helpers/slug";
import { clickersript, ebgaramond, newsreader } from "@/lib/font";
import { menuCoffe } from "@/lib/menu";
import { GlassWater, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/cartSlice";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function DetailMenuPage() {
  const { name: productName } = useParams();
  const decodeParams = deSlug(productName as string);
  const product = menuCoffe.find((item) => item.name === decodeParams);

  const { status } = useSession();

  const [activeVariant, setActiveVariant] = useState(product?.variant[0]);
  const [quantity, setQuantity] = useState<number>(1);

  const addQty = () => {
    setQuantity((prev) => {
      const newCount = prev + 1;
      return newCount;
    });
  };

  const minQty = () => {
    setQuantity((prev) => {
      const newCount = prev > 1 ? prev - 1 : 1;
      return newCount;
    });
  };

  const dispatch = useAppDispatch();

  const addToCart = async () => {
    if (status !== "authenticated") {
      toast.error("Silakan login terlebih dahulu");
      return;
    }
    if (!product || !activeVariant) return;
    const payload = {
      id: `${createSlug(product.name)}`,
      name: product.name,
      imageUrl: product.imageUrl,
      variant: activeVariant.name,
      price: activeVariant.price,
      quantity,
    };

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        toast.error("Silakan login terlebih dahulu");
        return;
      }
      if (!res.ok) {
        toast.error("Gagal menambahkan ke keranjang");
        return;
      }

      dispatch(addItem(payload));
      toast.success("Berhasil ditambahkan ke keranjang");
    } catch (err) {
      toast.error("Terjadi kesalahan jaringan");
    }
  };

  return (
    <div className="bg-black">
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="">
            <Image
              src={
                product?.imageUrl
                  ? product.imageUrl
                  : "/images/menu/hazelnut.jpeg"
              }
              width={500}
              height={500}
              alt="photo menu"
            />
          </div>
          <div className="">
            <p className="text-gray-400">
              {product?.category} / {product?.name}
            </p>
            <h1
              className={`my-3 text-5xl font-bold text-white md:my-4 lg:my-6 ${ebgaramond.className}`}
            >
              {product?.name}
            </h1>
            <p className="text-justify text-white">{product?.description}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {product?.variant.map((item, i) => {
                const isActive = activeVariant?.name === item.name;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveVariant(item)}
                    className={`hover:bg-accent/20 hover:border-accent cursor-pointer rounded-sm border-2 px-4 py-4 text-base text-white transition-all duration-300 ${isActive ? "bg-accent/20 border-accent" : "border-gray-500 bg-white/10"}`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            {/* <div className="mt-6 flex items-center gap-4">
              <GlassWater className="text-accent size-5" />
              <p className="text-accent text-lg font-semibold">
                Rp {(activeVariant?.price || 0).toLocaleString("id-ID")}{" "}
              </p>
            </div> */}
            <div className="mt-10 flex items-stretch gap-4">
              <div className="flex items-center gap-5 rounded-md border border-gray-500 p-4">
                <button onClick={minQty} className="cursor-pointer">
                  <Minus className="size-4 text-white" />
                </button>
                <p className="text-base font-medium text-white">{quantity}</p>
                <button onClick={addQty} className="cursor-pointer">
                  <Plus className="size-4 text-white" />
                </button>
              </div>
              <button
                onClick={addToCart}
                className="bg-accent/50 hover:bg-accent/70 flex grow cursor-pointer items-center justify-center gap-2 rounded-md py-4 text-white transition-all duration-200"
              >
                <ShoppingCart className="size-4 text-white" />
                <span>Masukkan Keranjang</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
