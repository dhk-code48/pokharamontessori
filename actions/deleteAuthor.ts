"use server";

import db from "@/lib/prismadb";

export const deleteAuthor = async (authorId: string) => {
  try {
    await db.author.delete({
      where: {
        id: authorId,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Author Deleated Success" };
};
