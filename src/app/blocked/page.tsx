import { ServerCrash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function QrBlockedPage() {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 hover:scale-110 transition-transform duration-300 bg-red-500/5 rounded-2xl flex items-center justify-center group-hover:scale-110">
            <ServerCrash className="w-8 h-8  text-red-500" />
        </div>
        <div className="flex flex-col items-center justify-center my-6">
            <h1 className="text-4xl font-bold mb-4 text-primary">Acesso bloqueado.</h1>
            <p className="text-lg text-gray-400 mb-6">
              O link deste QR Code não está mais ativo.
            </p>
        </div>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-primary/80 text-white font-semibold rounded-full hover:bg-primary transition hover:scale-105"
        >
          Voltar para a página inicial
        </a>

        <footer className="absolute bottom-10 text-center">
          <Link href="/" className="text-xs text-gray-400 hover:scale-110 transition-transform duration-300 flex items-center justify-center gap-2 border border-gray-200  rounded-full px-4 py-3">
            Criado com <Image src="/logo-black.svg" alt="QRFlex" width={80} height={20} className="opacity-50" />
          </Link>
        </footer>
      </main>
    );
  }
  