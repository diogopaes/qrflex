import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { adminDb } from '@/config/firebase';
import { Timestamp } from 'firebase-admin/firestore';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { name, url } = body;

    // Verificar se o QR Code existe e pertence ao usuário
    const qrCodeRef = adminDb().collection('qrcodes').doc(params.id);
    const qrCode = await qrCodeRef.get();

    if (!qrCode.exists) {
      return new NextResponse('QR Code não encontrado', { status: 404 });
    }

    const qrCodeData = qrCode.data();
    if (qrCodeData?.userId !== session.user.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Atualizar o QR Code
    await qrCodeRef.update({
      name,
      url,
      updatedAt: Timestamp.now(),
    });

    // Retornar os dados atualizados
    return NextResponse.json({
      id: qrCode.id,
      name,
      url,
      shortUrl: qrCodeData.shortUrl,
      clicks: qrCodeData.clicks,
      createdAt: qrCodeData.createdAt.toDate(),
      updatedAt: Timestamp.now().toDate(),
    });
  } catch (error) {
    console.error('Erro ao atualizar QR Code:', error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}