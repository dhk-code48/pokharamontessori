"use server";

import db from "@/lib/prismadb";
import { Carousel } from "@prisma/client";

const getCarousels = async (): Promise<Carousel[] | null> => {
  const siteId = process.env.NEXT_SITEID;

  if (!siteId) {
    return null;
  }

  let carousels: Carousel[] | null;

  try {
    carousels = await db.carousel.findMany();
  } catch (error) {
    return null;
  }

  return carousels;
};
export default getCarousels;
