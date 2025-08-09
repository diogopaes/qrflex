"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export function useUpgradePlan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { update } = useSession();

  const upgrade = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/stripe/upgrade", {
        method: "POST",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Erro ao fazer upgrade");
      }

      const data = await res.json();

      if (data?.success) {
        setSuccess(true);
        await update();
      } else {
        setError(data?.message || "Upgrade falhou");
      }
    } catch (err: { message: string } | Error | unknown) {
      setError((err as Error).message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  return {
    upgrade,
    loading,
    error,
    success,
  };
}
