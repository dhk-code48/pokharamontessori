"use server";

import db from "@/lib/prismadb";

export const deleteCategory = async (categoryId: string) => {
  try {
    await db.category.delete({
      where: {
        id: categoryId,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Category Deleated Success" };
};
