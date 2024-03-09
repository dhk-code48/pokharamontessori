"use server";

import db from "@/lib/prismadb";
import { SubCategorySchema } from "@/schemas";
import * as z from "zod";

export const updateSubCategory = async (
  values: z.infer<typeof SubCategorySchema>,
  { subCategoryId }: { subCategoryId: string }
) => {
  const validatedFields = SubCategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  const { categoryId, name } = validatedFields.data;

  try {
    await db.subCategory.update({
      where: {
        id: subCategoryId,
      },
      data: {
        name,
        categoryId,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "SubCategory Updated Success" };
};
