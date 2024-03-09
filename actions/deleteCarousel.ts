"use server";

import db from "@/lib/prismadb";

export const deleteCarousel = async (carouselId: string) => {
  try {
    await db.carousel.delete({
      where: {
        id: carouselId,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Carousel Deleated Success" };
};
