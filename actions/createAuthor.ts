"use server";

import db from "@/lib/prismadb";
import { AuthorSchema } from "@/schemas";
import * as z from "zod";

export const createAuthor = async (values: z.infer<typeof AuthorSchema>) => {
  const validatedFields = AuthorSchema.safeParse(values);
  const siteId = process.env.NEXT_SITEID;

  if (!validatedFields.success || !siteId) {
    return { error: "Invalidate Data" };
  }

  const { name, imageUrl } = validatedFields.data;

  try {
    await db.author.create({
      data: {
        imageUrl,
        name,
        siteId,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Author Created Success" };
};
