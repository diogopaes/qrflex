import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { admin, adminDb } from '@/config/firebase';
import { nanoid } from 'nanoid';

async function generateUniqueShortId(): Promise<string> {
  let shortId = "";
  let exists = true;

  while (exists) {
    shortId = nanoid(8);
    const query = await adminDb()
      .collection("qrcodes")
      .where("shortId", "==", shortId)
      .limit(1)
      .get();

    exists = !query.empty;
  }

  return shortId;
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { name, url } = body;

    const shortId = await generateUniqueShortId();
    const shortUrl = `${process.env.NEXT_PUBLIC_APP_URL}/qr/${shortId}`;

    const qrCodeRef = adminDb().collection('qrcodes').doc();
    await qrCodeRef.set({
      id: qrCodeRef.id,
      userId: session.user.id,
      name,
      url,
      shortUrl,
      shortId,
      status: 'active',
      clicks: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      id: qrCodeRef.id,
      name,
      url,
      shortUrl,
      status: 'active',
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

    const qrCodesSnapshot = await adminDb()
      .collection('qrcodes')
      .where('userId', '==', session?.user?.id)
      .orderBy('createdAt', 'desc')
      .get();

    const qrCodes = qrCodesSnapshot.docs.map(doc => {
      const data = doc.data();
      const createdAt =
        data.createdAt?.toDate?.() ??
        (data.createdAt ? new Date(data.createdAt) : null);
    
      const updatedAt =
        data.updatedAt?.toDate?.() ??
        (data.updatedAt ? new Date(data.updatedAt) : null);
    
      return {
        id: doc.id,
        ...data,
        createdAt: createdAt ? createdAt.toISOString() : null,
        updatedAt: updatedAt ? updatedAt.toISOString() : null,
      };
    });      

    return NextResponse.json(qrCodes);
  } catch (error) {
    console.error('Error fetching QR codes:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
