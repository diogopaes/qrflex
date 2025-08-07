import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { adminDb } from '@/config/firebase';
import { nanoid } from 'nanoid';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { name, url } = body;

    const shortId = nanoid(8);
    const shortUrl = `${process.env.NEXT_PUBLIC_APP_URL}/qr/${shortId}`;

    const qrCodeRef = adminDb().collection('qrcodes').doc();
    await qrCodeRef.set({
      id: qrCodeRef.id,
      userId: session.user.id,
      name,
      url,
      shortUrl,
      shortId,
      clicks: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json({
      id: qrCodeRef.id,
      name,
      url,
      shortUrl,
      clicks: 0,
    });
  } catch (error) {
    console.error('Error creating QR code:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    console.log('session', session);

    const qrCodesSnapshot = await adminDb()
      .collection('qrcodes')
      .where('userId', '==', session?.user?.id)
      //.orderBy('createdAt', 'desc')
      .get();

    const qrCodes = qrCodesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      };
    });

    return NextResponse.json(qrCodes);
  } catch (error) {
    console.error('Error fetching QR codes:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
