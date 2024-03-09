"use server";

import db from "@/lib/prismadb";
import { CarouselSchema } from "@/schemas";
import * as z from "zod";

export const updateCarousel = async (
  values: z.infer<typeof CarouselSchema>,
  { carouselId }: { carouselId: string }
) => {
  const validatedFields = CarouselSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  const { label, imageUrl } = validatedFields.data;

  try {
    await db.carousel.update({
      where: {
        id: carouselId,
      },
      data: {
        label,
        imageUrl,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Carousel Updated Success" };
};
