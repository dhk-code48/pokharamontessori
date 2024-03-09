"use server";

import db from "@/lib/prismadb";
import { CarouselSchema } from "@/schemas";
import * as z from "zod";

export const createCarousel = async (values: z.infer<typeof CarouselSchema>) => {
  const validatedFields = CarouselSchema.safeParse(values);

  const siteId = process.env.NEXT_SITEID;

  if (!validatedFields.success || !siteId) {
    return { error: "Invalidate Data" };
  }

  const { imageUrl, label } = validatedFields.data;

  try {
    await db.carousel.create({
      data: {
        label,
        imageUrl,
        siteId,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Carousel Created Success" };
};
