'use client';

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { signOut } from "next-auth/react";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: any;
  onManageSubscription: () => void;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function AccountModal({ isOpen, onClose, session, onManageSubscription }: AccountModalProps) {
  const userInitials = session?.user?.name ? getInitials(session.user.name) : '??';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle></DialogTitle>
        <div className="flex flex-col items-center pb-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold mt-4">{session?.user?.name}</h2>
          <p className="text-sm text-gray-500">{session?.user?.email}</p>
        </div>

        {/* Conta Vinculada */}
        <div className="border-t border-gray-100 pt-6 pb-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Conta Vinculada</h3>
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
    <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
</svg>
              </div>
              <div>
                <p className="text-sm font-medium">Google</p>
                <p className="text-xs text-gray-500">{session?.user?.email}</p>
              </div>
            </div>
            <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Conectado
            </div>
          </div>
        </div>

        {/* Faturamento */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Faturamento</h3>
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Plano {session?.user?.plan === 'basic' ? 'Básico' : 'Completo'}</p>
                {/* <p className="text-xs text-gray-500">Gerenciar assinatura</p> */}
              </div>
            </div>
            <Button 
              onClick={onManageSubscription}
              variant="ghost" 
              className="text-xs border border-gray-300 bg-gray-100 hover:bg-gray-100 cursor-pointer hover:scale-105 transition-all duration-300 rounded-full"
            >
              Gerenciar assinatura
            </Button>
          </div>
        </div>

        {/* Sair */}
        <div className="pt-6 mx-auto">
          <Button 
            onClick={() => signOut()}
            variant="ghost" 
            className="text-xs px-6 py-2 rounded-full bg-red-100 text-red-400 hover:bg-red-500 hover:text-white cursor-pointer hover:scale-105 transition-all duration-300"
          >
            Sair
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
