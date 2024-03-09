"use server";

import db from "@/lib/prismadb";
import { Blog } from "@prisma/client";

const getBlog = async ({
  isFeatured,
  isArchived,
  categoryId,
  subcategoryId,
}: {
  isArchived?: boolean;
  isFeatured?: boolean;
  categoryId?: string;
  subcategoryId?: string;
}): Promise<Blog[] | null> => {
  const siteId = process.env.NEXT_SITEID;

  if (!siteId) {
    return null;
  }

  let blog: Blog[] | null;

  try {
    blog = await db.blog.findMany({
      where: {
        isFeatured,
        isArchived,
        categoryId,
        subCategoryId: subcategoryId,
      },
      include: {
        author: true,
        category: true,
      },
    });
  } catch (error) {
    return null;
  }

  return blog;
};
export default getBlog;
