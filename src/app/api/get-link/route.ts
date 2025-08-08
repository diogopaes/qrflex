import { adminDb } from "@/config/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const shortId = searchParams.get("id");

  if (!shortId) {
    return NextResponse.json({ error: "ID ausente" }, { status: 400 });
  }

  try {
    const querySnap = await adminDb()
      .collection("qrcodes")
      .where("shortId", "==", shortId)
      .limit(1)
      .get();

    if (querySnap.empty) {
      return NextResponse.json({ error: "QR Code não encontrado" }, { status: 404 });
    }

    const data = querySnap.docs[0].data();
    const url = data?.url;

    if (!url) {
      return NextResponse.json({ error: "URL inválida" }, { status: 400 });
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Erro ao buscar QR Code:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
