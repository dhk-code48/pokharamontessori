import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request, { params }: { params: { siteId: string } }) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, categoryId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
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

    const subcategory = await prismadb.subCategory.create({
      data: {
        name,
        categoryId: categoryId,
        siteId: params.siteId,
      },
    });

    return NextResponse.json(subcategory);
  } catch (error) {
    console.log("[SUBCATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { siteId: string } }) {
  const categoryId = req.nextUrl.searchParams.get("categoryId");
  try {
    if (!params.siteId) {
      return new NextResponse("Site id is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const subcategories = await prismadb.subCategory.findMany({
      where: {
        siteId: params.siteId,
        categoryId: categoryId,
      },
    });

    return NextResponse.json(subcategories);
  } catch (error) {
    console.log("[SUBCATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
