import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function PATCH(req: Request, { params }: { params: { siteId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.siteId) {
      return new NextResponse("Site id is required", { status: 400 });
    }

    const site = await prismadb.site.updateMany({
      where: {
        id: params.siteId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(site);
  } catch (error) {
    console.log("[SITE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { siteId: string } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.siteId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const site = await prismadb.site.deleteMany({
      where: {
        id: params.siteId,
        userId,
      },
    });

    return NextResponse.json(site);
  } catch (error) {
    console.log("[SITE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
