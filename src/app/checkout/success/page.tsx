"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const steps = [
  "Assinatura confirmada ✔️",
  "Atualizando seus dados...",
  "Montando seu painel...",
  "Redirecionando para o dashboard 🚀",
];

export default function CheckoutSuccessPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const runSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        await new Promise((res) => setTimeout(res, 1000));

        if (i === 1) {
            await update();
        }

        if (i === steps.length - 1) {
            router.replace("/dashboard");
        }
      }
    };

    runSteps();
  }, []);

  return (
    <main className="flex h-screen items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">🎉 Assinatura realizada com sucesso!</h1>
        <ul className="space-y-4 text-gray-700 text-lg">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`transition-opacity duration-500 ${
                index === currentStep ? "opacity-100 font-semibold" : "opacity-30"
              }`}
            >
              {step}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}