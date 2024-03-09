"use server";

import db from "@/lib/prismadb";
import { BlogSchema } from "@/schemas";
import * as z from "zod";

export const updateBlog = async (
  values: z.infer<typeof BlogSchema>,
  { blogId }: { blogId: string }
) => {
  const validatedFields = BlogSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  const {
    authorId,
    categoryId,
    imageUrl,
    content,
    headline,
    subcategoryId,
    title,
    isArchived,
    isFeatured,
  } = validatedFields.data;

  try {
    await db.blog.update({
      where: {
        id: blogId,
      },
      data: {
        authorId,
        categoryId,
        imageUrl,
        content,
        headline,
        subCategoryId: subcategoryId,
        title,
        isArchived,
        isFeatured,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Blog Updated Success" };
};
