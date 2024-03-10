"use server";

import db from "@/lib/prismadb";
import { Author, Billboard, Category, SubCategory } from "@prisma/client";

const getCategory = async (
  categoryId: string
): Promise<(Category & { subCategory: SubCategory[]; billboard: Billboard }) | null> => {
  const siteId = process.env.NEXT_SITEID;

  if (!siteId) {
    return null;
  }

  let category: (Category & { subCategory: SubCategory[]; billboard: Billboard }) | null;

  try {
    category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        subCategory: true,
        billboard: true,
      },
    });
  } catch (error) {
    return null;
  }

  return category;
};
export default getCategory;
