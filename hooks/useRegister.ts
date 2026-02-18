import { FormRegister } from "@/types/auth";
import { useState } from "react";

export function useRegister() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const actionRegister = async (input: FormRegister) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Terjadi kesalahan saat registrasi");
      }

      setData(result);
      return result;
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, actionRegister };
}
