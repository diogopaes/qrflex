"use client";
import { useState } from "react";

interface FaqItemProps {
  pergunta: string;
  resposta: string;
}

function FaqItem({ pergunta, resposta }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:border-gray-200 transition-colors duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 cursor-pointer py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-800">{pergunta}</h3>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`px-6 transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-40 py-4" : "max-h-0"
        } overflow-hidden`}
      >
        <p className="text-gray-600">{resposta}</p>
      </div>
    </div>
  );
}

export default function FaqList() {
  const faqs = [
    {
      pergunta: "Quantos QRs posso criar no plano de R$ 9,90?",
      resposta: "Apenas 1, mas com edição ilimitada do link."
    },
    {
      pergunta: "O QR muda quando edito o link?",
      resposta: "Não. O QR permanece o mesmo, você pode editar sempre que quiser."
    },
    {
      pergunta: "Posso ver estatísticas de acesso?",
      resposta: "Sim, mas apenas no plano Premium (R$ 29,90/mês)."
    },
    {
      pergunta: "Tem fidelidade?",
      resposta: "Não. Cancele quando quiser."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((item, index) => (
        <FaqItem
          key={index}
          pergunta={item.pergunta}
          resposta={item.resposta}
        />
      ))}
    </div>
  );
}
