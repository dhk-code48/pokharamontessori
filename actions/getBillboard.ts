"use server";

import db from "@/lib/prismadb";
import { Author, Billboard } from "@prisma/client";

const getBillboard = async (billboardId: string): Promise<Billboard | null> => {
  const siteId = process.env.NEXT_SITEID;

  if (!siteId) {
    return null;
  }

  let billboard: Billboard | null;

  try {
    billboard = await db.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });
  } catch (error) {
    return null;
  }

  return billboard;
};
export default getBillboard;
