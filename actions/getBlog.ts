"use server";

import db from "@/lib/prismadb";
import { Author, Blog } from "@prisma/client";

const getBlog = async (blogId: string): Promise<(Blog & { author: Author }) | null> => {
  const siteId = process.env.NEXT_SITEID;

  if (!siteId) {
    return null;
  }

  let blog: (Blog & { author: Author }) | null;

  try {
    blog = await db.blog.findUnique({
      where: {
        id: blogId,
      },
      include: {
        author: true,
      },
    });
  } catch (error) {
    return null;
  }

  return blog;
};
export default getBlog;
