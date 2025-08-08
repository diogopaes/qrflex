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
import { useState } from "react";
import { AccountModal } from "@/components/AccountModal";
import { useUpgradePlan } from "@/hooks/useUpgradePlan";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function HeaderDashboard({ session }: { session: any }) {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const { upgrade } = useUpgradePlan();
  const userInitials = session?.user?.name ? getInitials(session.user.name) : '??';
  const planLabel = session?.user?.plan === 'basic' ? 'Básico' : 'Completo';
  const planColor = session?.user?.plan === 'basic' ? 'text-yellow-500 bg-yellow-100' : 'text-primary bg-primary/10';

  async function handleGenratedLinkToPortal() {
    const res = await fetch("/api/stripe/portal", {
      method: "POST",
    });

    const data = await res.json();
    if (data?.url) {
      window.location.href = data.url; 
    }
  };

  async function handleManageSubscription() {
    await handleGenratedLinkToPortal();
  }

  return (
    <header className="bg-white border-b border-gray-200 h-16 fixed left-0 right-0 top-0 z-30">
      <div className="container mx-auto h-full">
        <div className="px-6 h-full flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold text-primary">
            <Image src="/logo.svg" alt="QRFlex" width={149} height={32} />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${planColor}`}>
                {planLabel}
              </span>
            </span>
            <Button variant="ghost" size="sm" onClick={() => setIsAccountModalOpen(true)} className="relative cursor-pointer h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8 hover:scale-110 transition-all duration-300">
                <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </Button>

            <AccountModal 
              isOpen={isAccountModalOpen}
              onClose={() => setIsAccountModalOpen(false)}
              session={session}
              onManageSubscription={handleManageSubscription}
            />
          </div>
        </div>
      </div>
    </header>
  );
}