'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function HeaderDashboard({ session }: { session: any }) {
    return (
        <header className="bg-white border-b border-gray-200 h-16 fixed left-0 right-0 top-0 z-30">
        <div className="container mx-auto h-full">
          <div className="px-6 h-full flex items-center justify-between">
            <Link href="/dashboard" className="text-2xl font-bold text-primary">
              QRFlex
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {session?.user?.email}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <span className="text-xl">⚙️</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/dashboard/settings" className="w-full">
                      Configurações
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button type="button" onClick={() => signOut()} className="w-full">Sair</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
            </div>
          </div>
        </div>
      </header>
    )
}