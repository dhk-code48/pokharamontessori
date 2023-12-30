import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request, { params }: { params: { siteId: string } }) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
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

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        siteId: params.siteId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { siteId: string } }) {
  try {
    if (!params.siteId) {
      return new NextResponse("Site id is required", { status: 400 });
    }

    const categories = await prismadb.category.findMany({
      where: {
        siteId: params.siteId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
