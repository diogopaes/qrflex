"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useUserPlan() {
  const { data: session, status, update } = useSession();
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<"none" | "basic" | "premium">("none");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      if (status !== "authenticated" || !session?.user?.email) return;

      try {
        const res = await fetch("/api/auth/refresh-session", {
          method: "POST",
        });

        const data = await res.json();

        if (data?.plan && data.plan !== session.user.plan) {
          await update({ plan: data.plan });
          setPlan(data.plan);
        } else {
          setPlan(session.user.plan as "none" | "basic" | "premium" || "none");
        }
      } catch (err) {
        console.error("Erro ao atualizar plano:", err);
        setError("Erro ao buscar plano");
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [session?.user?.email, status]);

  return {
    plan,
    loading,
    error,
    isPremium: plan === "premium",
    isBasic: plan === "basic",
    isNone: plan === "none",
  };
}
