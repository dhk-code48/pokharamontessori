"use server";

import db from "@/lib/prismadb";
import { CategorySchema } from "@/schemas";
import * as z from "zod";

export const createCategory = async (values: z.infer<typeof CategorySchema>) => {
  const validatedFields = CategorySchema.safeParse(values);

  const siteId = process.env.NEXT_SITEID;

  if (!validatedFields.success || !siteId) {
    return { error: "Invalidate Data" };
  }

  const { billboardId, name } = validatedFields.data;

  try {
    await db.category.create({
      data: {
        billboardId,
        name,
        siteId,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Category Created Success" };
};
