"use server";

import db from "@/lib/prismadb";
import { Site } from "@prisma/client";

const getSite = async (): Promise<Site | null> => {
  const siteId = process.env.NEXT_SITEID;

  if (!siteId) {
    return null;
  }

  let site: Site | null;

  try {
    site = await db.site.findUnique({
      where: {
        id: siteId,
      },
    });
  } catch (error) {
    return null;
  }

  return site;
};
export default getSite;
