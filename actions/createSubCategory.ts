"use server";

import db from "@/lib/prismadb";
import { SubCategorySchema } from "@/schemas";
import * as z from "zod";

export const createSubCategory = async (values: z.infer<typeof SubCategorySchema>) => {
  const validatedFields = SubCategorySchema.safeParse(values);

  const siteId = process.env.NEXT_SITEID;

  if (!validatedFields.success || !siteId) {
    return { error: "Invalidate Data" };
  }

  const { categoryId, name } = validatedFields.data;

  try {
    await db.subCategory.create({
      data: {
        name,
        categoryId,
        siteId,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "SubCategory Created Success" };
};
