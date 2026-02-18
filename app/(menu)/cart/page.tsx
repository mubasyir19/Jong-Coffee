"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCartItems,
  selectCartTotal,
  removeItem,
  increaseQty,
  decreaseQty,
  clearCart,
} from "@/store/cartSlice";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { useSession } from "next-auth/react";
import { InputCheckout } from "@/types/cart";
import { useCheckout } from "@/hooks/useCart";
import { toast } from "sonner";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const { actionCheckout, loading, error } = useCheckout();

  const [formCheckout, setFormCheckout] = useState<InputCheckout>({
    name: session?.user.name || "Pelanggan",
    email: session?.user.email || "-",
    phoneNumber: "",
    items: items,
    totalPrice: total,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormCheckout((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    const finalData: InputCheckout = {
      ...formCheckout,
      items: items,
      totalPrice: total,
    };
    try {
      if (!formCheckout.phoneNumber) {
        return toast.error("Nomor telepon wajib diisi");
      }

      actionCheckout(finalData);
      toast.success("Pesanan dibuat");
    } catch (error) {
      toast.error((error as Error).message || "Gagal kirim pesanan");
    }
  };

  return (
    <div className="min-h-screen bg-black py-24">
      <div className="container mx-auto px-6">
        <h1 className="mb-6 text-3xl font-semibold text-white">Keranjang</h1>

        {items.length === 0 ? (
          <div className="rounded-md border border-gray-600 p-8 text-center text-white">
            <p>Keranjang kosong.</p>
            <Link href="/menu" className="text-accent mt-4 inline-block">
              Lihat Menu
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-md border border-gray-700 p-6 md:col-span-2">
              {items.map((it) => (
                <div
                  key={`${it.id}-${it.variant}`}
                  className="mb-4 flex items-center gap-4 border-b border-gray-800 pb-4"
                >
                  <div className="h-20 w-20 overflow-hidden rounded-md bg-neutral-900">
                    {it.imageUrl ? (
                      <Image
                        src={it.imageUrl}
                        alt={it.name}
                        width={80}
                        height={80}
                      />
                    ) : null}
                  </div>
                  <div className="flex grow flex-col">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{it.name}</p>
                        <p className="text-sm text-gray-400">{it.variant}</p>
                      </div>
                      <div className="">
                        <p className="text-right text-sm text-white">
                          Rp {it.price.toLocaleString("id-ID")}
                        </p>
                        <p className="text-accent">
                          Rp {(it.quantity * it.price).toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() =>
                          dispatch(
                            decreaseQty({ id: it.id, variant: it.variant }),
                          )
                        }
                        className="rounded border border-gray-700 px-3 py-1 text-white"
                      >
                        -
                      </button>
                      <div className="text-white">{it.quantity}</div>
                      <button
                        onClick={() =>
                          dispatch(
                            increaseQty({ id: it.id, variant: it.variant }),
                          )
                        }
                        className="rounded border border-gray-700 px-3 py-1 text-white"
                      >
                        +
                      </button>

                      <button
                        onClick={() =>
                          dispatch(
                            removeItem({ id: it.id, variant: it.variant }),
                          )
                        }
                        className="ml-auto text-sm text-red-400"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-md border border-gray-700 p-6">
              <p className="text-sm text-gray-400">Ringkasan</p>
              <p className="my-4 text-2xl font-semibold text-white">
                Rp {total.toLocaleString("id-ID")}
              </p>

              <button
                onClick={() => dispatch(clearCart())}
                className="mb-3 w-full rounded-md border border-gray-600 py-2 text-sm text-white"
              >
                Kosongkan Keranjang
              </button>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="bg-accent/70 w-full rounded-md py-2 text-sm text-white">
                    Checkout
                  </button>
                </DialogTrigger>
                <DialogContent className="border-accent border bg-black">
                  <DialogHeader>
                    <DialogTitle className="text-white">Pesan Menu</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <FieldLabel htmlFor="email" className="text-white">
                        Nama Lengkap
                      </FieldLabel>
                      <Input
                        type="text"
                        name="name"
                        value={formCheckout.name}
                        onChange={handleChange}
                        placeholder="Jhon Doe"
                        className="border-accent border-2 text-white placeholder:text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <FieldLabel htmlFor="email" className="text-white">
                        Email
                      </FieldLabel>
                      <Input
                        type="email"
                        name="email"
                        value={formCheckout.email}
                        onChange={handleChange}
                        placeholder="jhondoe@mail.com"
                        className="border-accent border-2 text-white placeholder:text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <FieldLabel htmlFor="email" className="text-white">
                        Nomor Telepon
                      </FieldLabel>
                      <Input
                        type="text"
                        name="phoneNumber"
                        value={formCheckout.phoneNumber}
                        onChange={handleChange}
                        placeholder="+62 XXX-XXX-XXX"
                        className="border-accent border-2 text-white placeholder:text-sm"
                        required
                      />
                    </div>
                    <div className="">
                      <p className="text-lg font-medium text-white">
                        List Pesanan
                      </p>
                      <div className="my-2">
                        <hr className="border border-white/50" />
                      </div>
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-4 items-center gap-4 border-b border-gray-800 py-2 last:border-0"
                        >
                          {/* Kolom Nama & Variant (Mengambil 2 bagian dari 4) */}
                          <div className="col-span-2">
                            <p className="truncate text-sm font-semibold text-white">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.variant}
                            </p>
                          </div>

                          {/* Kolom Quantity (Rata Tengah/Kiri agar sejajar vertikal) */}
                          <div className="text-center md:text-left">
                            <p className="text-sm text-white">
                              x {item.quantity}
                            </p>
                          </div>

                          {/* Kolom Harga (Rata Kanan) */}
                          <div className="text-right">
                            <p className="text-sm font-medium text-white">
                              Rp{" "}
                              {(item.quantity * item.price).toLocaleString(
                                "id-ID",
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="my-2">
                      <hr className="border border-white/50" />
                    </div>
                    <div className="">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-white">Total Harga:</p>
                        <p className="text-sm text-white">
                          Rp {total.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <Button
                        onClick={handleCheckout}
                        variant={"thrid"}
                        size={"sm"}
                        className="w-full text-white"
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Pesan Sekarang"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
