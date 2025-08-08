import { admin, adminDb } from "@/config/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id: shortId } = await req.json();

  if (!shortId) {
    return NextResponse.json({ error: "ID ausente" }, { status: 400 });
  }

  const querySnap = await adminDb()
    .collection("qrcodes")
    .where("shortId", "==", shortId)
    .limit(1)
    .get();

  if (querySnap.empty) {
    return NextResponse.json({ error: "QR Code não encontrado" }, { status: 404 });
  }

  const docRef = querySnap.docs[0].ref;

  await docRef.update({
    clicks: admin.firestore.FieldValue.increment(1),
  });

  return NextResponse.json({ success: true });
}