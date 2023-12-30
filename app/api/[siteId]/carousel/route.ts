import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request, { params }: { params: { siteId: string } }) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.siteId) {
      return new NextResponse("Site id is required", { status: 400 });
    }

    const siteByUserId = await prismadb.site.findFirst({
      where: {
        id: params.siteId,
        userId,
      },
    });

    if (!siteByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const crousel = await prismadb.carousel.create({
      data: {
        label,
        imageUrl,
        siteId: params.siteId,
      },
    });

    return NextResponse.json(crousel);
  } catch (error) {
    console.log("[CROUSELS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { siteId: string } }) {
  try {
    if (!params.siteId) {
      return new NextResponse("Site id is required", { status: 400 });
    }

    const crousels = await prismadb.carousel.findMany({
      where: {
        siteId: params.siteId,
      },
    });

    return NextResponse.json(crousels);
  } catch (error) {
    console.log("[CROUSELS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
