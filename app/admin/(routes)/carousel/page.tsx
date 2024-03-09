import { format } from "date-fns";

import db from "@/lib/prismadb";

import { CarouselColumn } from "./_components/columns";
import { CarouselClient } from "./_components/client";

const CarouselPage = async () => {
  const carousel = await db.carousel.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCarousels: CarouselColumn[] = carousel.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CarouselClient data={formattedCarousels} />
      </div>
    </div>
  );
};

export default CarouselPage;
