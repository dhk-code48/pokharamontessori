"use server";

import db from "@/lib/prismadb";
import { Author, Billboard, Category } from "@prisma/client";

const getCategory = async (
  categoryId: string
): Promise<(Category & { billboard: Billboard }) | null> => {
  const siteId = process.env.NEXT_SITEID;

  if (!siteId) {
    return null;
  }

  let category: (Category & { billboard: Billboard }) | null;

  try {
    category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        billboard: true,
      },
    });
  } catch (error) {
    return null;
  }

  return category;
};
export default getCategory;
