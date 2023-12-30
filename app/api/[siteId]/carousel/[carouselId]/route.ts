import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(req: Request, { params }: { params: { carouselId: string } }) {
  try {
    if (!params.carouselId) {
      return new NextResponse("Carousel id is required", { status: 400 });
    }

    const carousel = await prismadb.carousel.findUnique({
      where: {
        id: params.carouselId,
      },
    });

    return NextResponse.json(carousel);
  } catch (error) {
    console.log("[CAROUSEL_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { carouselId: string; siteId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.carouselId) {
      return new NextResponse("Carousel id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.site.findFirst({
      where: {
        id: params.siteId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const billboard = await prismadb.carousel.delete({
      where: {
        id: params.carouselId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[CAROUSEL_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { carouselId: string; siteId: string } }
) {
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

    if (!params.carouselId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.site.findFirst({
      where: {
        id: params.siteId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const billboard = await prismadb.carousel.update({
      where: {
        id: params.carouselId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[CAROUSEL_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
