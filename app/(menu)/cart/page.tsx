"use client";

import React from "react";
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

export default function CartPage() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();

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

              <button className="bg-accent/70 w-full rounded-md py-2 text-sm text-white">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
