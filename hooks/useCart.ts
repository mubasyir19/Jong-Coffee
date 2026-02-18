import { InputCheckout } from "@/types/cart";
import { useState } from "react";

export function useCheckout() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const actionCheckout = async (input: InputCheckout) => {
    setLoading(true);
    setError(null);

    try {
      const adminPhoneNumber = process.env.NEXT_PUBLIC_PHONE_ADMIN;

      if (!adminPhoneNumber) {
        throw new Error("Nomor Admin belum dikonfigurasi");
      }

      console.log("ini items nya", input.items);

      const totalPrice = input.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      const listPesanan = input.items
        .map((item, index) => `${index + 1}. ${item.name} (x${item.quantity})`)
        .join("\n");

      const message = `*Pesanan Jong Coffee*
------------------------------
*Data Pemesan:*
Nama: ${input.name || "Pelanggan"}
Email: ${input.email || "-"}
No. Telp: ${input.phoneNumber || "-"}

*Daftar Pesanan:*
${listPesanan}

*Total Pembayaran:* Rp ${totalPrice.toLocaleString("id-ID")}
------------------------------
Mohon segera diproses ya min, terima kasih!`;

      const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, "_blank");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { actionCheckout, loading, error };
}
