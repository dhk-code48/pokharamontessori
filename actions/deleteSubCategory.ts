"use server";

import db from "@/lib/prismadb";

export const deleteSubCategory = async (categoryId: string) => {
  try {
    await db.subCategory.delete({
      where: {
        id: categoryId,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "SubCategory Deleated Success" };
};
