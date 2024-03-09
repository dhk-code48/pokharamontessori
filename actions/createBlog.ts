"use server";

import db from "@/lib/prismadb";
import { BlogSchema } from "@/schemas";
import * as z from "zod";

export const createBlog = async (values: z.infer<typeof BlogSchema>) => {
  const validatedFields = BlogSchema.safeParse(values);
  const siteId = process.env.NEXT_SITEID;

  if (!validatedFields.success || !siteId) {
    return { error: "Invalidate Data" };
  }

  const {
    authorId,
    categoryId,
    content,
    headline,
    subcategoryId,
    title,
    isArchived,
    isFeatured,
    imageUrl,
  } = validatedFields.data;

  try {
    await db.blog.create({
      data: {
        imageUrl,
        authorId,
        categoryId,
        content,
        headline,
        subCategoryId: subcategoryId,
        title,
        isArchived,
        isFeatured,
        siteId,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Blog Created Success" };
};
