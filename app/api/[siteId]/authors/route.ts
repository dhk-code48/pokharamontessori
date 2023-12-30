import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request, { params }: { params: { siteId: string } }) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
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

    const author = await prismadb.author.create({
      data: {
        name,
        imageUrl,
        siteId: params.siteId,
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.log("[AUTHOR_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { siteId: string } }) {
  try {
    if (!params.siteId) {
      return new NextResponse("Site id is required", { status: 400 });
    }

    const authors = await prismadb.author.findMany({
      where: {
        siteId: params.siteId,
      },
    });

    return NextResponse.json(authors);
  } catch (error) {
    console.log("[AUTHORS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
