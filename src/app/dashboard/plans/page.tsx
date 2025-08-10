'use client';
import Plans from '@/components/Plans';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function DashboardPlansPage() {
    const { data: session } = useSession();

    if (session?.user.plan !== 'none') {
        redirect('/dashboard');
    }

    return (
        <Plans type="update" />
    )
}