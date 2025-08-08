'use client'
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Settings, LogOut, Star, User, Home } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function HeaderDashboard({ session }: { session: any }) {
  const userInitials = session?.user?.name ? getInitials(session.user.name) : '??';
  const planLabel = session?.user?.plan === 'basic' ? 'Básico' : 'Completo';
  const planColor = session?.user?.plan === 'basic' ? 'text-yellow-500 bg-yellow-100' : 'text-primary bg-primary/10';

  return (
    <header className="bg-white border-b border-gray-200 h-16 fixed left-0 right-0 top-0 z-30">
      <div className="container mx-auto h-full">
        <div className="px-6 h-full flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold text-primary">
            QRFlex
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${planColor}`}>
                {planLabel}
              </span>
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-2 py-1">
                    <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                    <p className="text-xs leading-none text-gray-500">{session?.user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                  <Home className="mr-2 h-8 w-4" />
                  <Link href="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-8 w-4" />
                  <Link href="/dashboard/settings" className="w-full">
                    Minha Conta
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Star className="mr-2 h-8 w-4" />
                  <Link href="/dashboard/plans" className="w-full">
                    Planos
                  </Link>
                </DropdownMenuItem> */}
                {/* <DropdownMenuItem>
                  <Settings className="mr-2 h-6 w-4" />
                  <Link href="/dashboard/settings" className="w-full">
                    Configurações
                  </Link>
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-400 focus:text-red-400" onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}