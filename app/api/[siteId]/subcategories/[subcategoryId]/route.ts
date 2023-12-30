import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(req: Request, { params }: { params: { subcategoryId: string } }) {
  try {
    if (!params.subcategoryId) {
      return new NextResponse("SubCategory id is required", { status: 400 });
    }

    const subcategory = await prismadb.subCategory.findUnique({
      where: {
        id: params.subcategoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(subcategory);
  } catch (error) {
    console.log("[SUBCATEGORY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { subcategoryId: string; siteId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.subcategoryId) {
      return new NextResponse("SubCategory id is required", { status: 400 });
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

    const category = await prismadb.subCategory.delete({
      where: {
        id: params.subcategoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[SUBCATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { subcategoryId: string; siteId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, categoryId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.subcategoryId) {
      return new NextResponse("SubCategory id is required", { status: 400 });
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

    const category = await prismadb.subCategory.update({
      where: {
        id: params.subcategoryId,
      },
      data: {
        name,
        categoryId: categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[SUBCATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
