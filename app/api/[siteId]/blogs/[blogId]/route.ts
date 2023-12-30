import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(req: Request, { params }: { params: { blogId: string } }) {
  try {
    if (!params.blogId) {
      return new NextResponse("Blog id is required", { status: 400 });
    }

    const blog = await prismadb.blog.findUnique({
      where: {
        id: params.blogId,
      },
      include: {
        author: true,
        category: true,
        subCategory: true,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.log("[BLOG_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { blogId: string; siteId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.blogId) {
      return new NextResponse("Blog id is required", { status: 400 });
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

    const blog = await prismadb.blog.delete({
      where: {
        id: params.blogId,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.log("[BLOG_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { blogId: string; siteId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const {
      title,
      categoryId,
      subcategoryId,
      authorId,
      isFeatured,
      isArchived,
      headline,
      content,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.blogId) {
      return new NextResponse("Blog id is required", { status: 400 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }
    if (!headline) {
      return new NextResponse("Headline is required", { status: 400 });
    }
    if (!content) {
      return new NextResponse("Content is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!authorId) {
      return new NextResponse("Author id is required", { status: 400 });
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

    const blog = await prismadb.blog.update({
      where: {
        id: params.blogId,
      },
      data: {
        title,
        categoryId,
        content,
        subCategoryId: subcategoryId,
        authorId,
        isFeatured,
        isArchived,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.log("[BLOG_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
