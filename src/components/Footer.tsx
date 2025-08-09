import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 bg-gray-50/50 border-t border-gray-100">
        <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold text-primary">
                <Image src="/logo.svg" alt="QRFlex" width={80} height={20} />
            </div>
            <div className="text-sm text-gray-600">
                © 2025 QR Flex | Todos os direitos reservados
            </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
            <Link href="/terms" className="text-gray-600 hover:text-primary transition-colors font-medium">
                Termos
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-primary transition-colors font-medium">
                Política de Privacidade
            </Link>
            </div>
        </div>
        </div>
    </footer>
  );
}