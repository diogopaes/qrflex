import { adminDb } from "@/config/firebase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const shortId = searchParams.get("id");

  if (!shortId) {
    return new NextResponse("ID inválido", { status: 400 });
  }

  const qrSnap = await adminDb()
    .collection("qrcodes")
    .where("shortId", "==", shortId)
    .limit(1)
    .get();

  if (qrSnap.empty) {
    return new NextResponse("QR Code não encontrado", { status: 404 });
  }

  const qrData = qrSnap.docs[0].data();

  const userSnap = await adminDb().collection("users").doc(qrData.userId).get();
  const userData = userSnap.data();
  const plan = userData?.plan;

  const isActive = plan === "basic" || plan === "premium";

  if (!isActive) {
    return new NextResponse(JSON.stringify({ expired: true }), {
      status: 403,
    });
  }

  return NextResponse.json({ url: qrData.url });
}
