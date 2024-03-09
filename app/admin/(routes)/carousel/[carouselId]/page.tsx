import db from "@/lib/prismadb";

import { CarouselForm } from "./_components/carousel-form";

const CarouselPage = async ({ params }: { params: { carouselId: string } }) => {
  const carousel = await db.carousel.findUnique({
    where: {
      id: params.carouselId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CarouselForm initialData={carousel} />
      </div>
    </div>
  );
};

export default CarouselPage;
