import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request, { params }: { params: { siteId: string } }) {
  try {
    const { userId } = auth();

    const body = await req.json();

    console.log("body", body);

    const {
      title,
      headline,
      content,
      subcategoryId,
      categoryId,
      authorId,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!authorId) {
      return new NextResponse("Author id is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!headline) {
      return new NextResponse("Headline is required", { status: 400 });
    }

    if (!params.siteId) {
      return new NextResponse("SITE id is required", { status: 400 });
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

    const blog = await prismadb.blog.create({
      data: {
        title,
        subCategoryId: subcategoryId,
        isFeatured,
        isArchived,
        categoryId,
        authorId,
        siteId: params.siteId,
        content,
        headline,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.log("[BLOGS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { siteId: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const subCategoryId = searchParams.get("subcategoryId") || undefined;
    const authorId = searchParams.get("authorId") || undefined;
    const title = searchParams.get("title") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.siteId) {
      return new NextResponse("SITE id is required", { status: 400 });
    }
    console.log("YES");

    const blogs = await prismadb.blog.findMany({
      where: {
        title,
        authorId,
        siteId: params.siteId,
        categoryId,
        subCategoryId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        author: true,
        subCategory: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.log("[BLOG_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
