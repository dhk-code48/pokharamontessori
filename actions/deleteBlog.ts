"use server";

import db from "@/lib/prismadb";

export const deleteBlog = async (blogId: string) => {
  try {
    await db.blog.delete({
      where: {
        id: blogId,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Blog Deleated Success" };
};
