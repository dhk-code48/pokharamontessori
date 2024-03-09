"use server";

import db from "@/lib/prismadb";
import { CategorySchema } from "@/schemas";
import * as z from "zod";

export const updateCategory = async (
  values: z.infer<typeof CategorySchema>,
  { categoryId }: { categoryId: string }
) => {
  const validatedFields = CategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  const { billboardId, name } = validatedFields.data;

  try {
    await db.category.update({
      where: {
        id: categoryId,
      },
      data: {
        billboardId,
        name,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Category Updated Success" };
};
