import { FormLogin } from "@/types/auth";
import { useState } from "react";

export function useLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const actionLogin = async (input: FormLogin) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/login`, {
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

      //   setData(result);
      return result;
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, actionLogin };
}
