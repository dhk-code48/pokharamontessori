"use server";

import db from "@/lib/prismadb";
import { AuthorSchema } from "@/schemas";
import * as z from "zod";

export const updateAuthor = async (
  values: z.infer<typeof AuthorSchema>,
  { authorId }: { authorId: string }
) => {
  const validatedFields = AuthorSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  const { name, imageUrl } = validatedFields.data;

  try {
    await db.author.update({
      where: {
        id: authorId,
      },
      data: {
        imageUrl,
        name,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Author Updated Success" };
};
