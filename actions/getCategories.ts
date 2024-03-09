"use server";

import db from "@/lib/prismadb";
import { Category } from "@prisma/client";

const getCategorys = async (): Promise<Category[] | null> => {
  const siteId = process.env.NEXT_SITEID;

  if (!siteId) {
    return null;
  }

  let categories: Category[] | null;

  try {
    categories = await db.category.findMany();
  } catch (error) {
    return null;
  }

  return categories;
};
export default getCategorys;
