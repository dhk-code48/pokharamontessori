import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CarouselColumn } from "./components/columns";
import { CarouselClient } from "./components/client";

const CarouselPage = async ({ params }: { params: { siteId: string } }) => {
  const carousel = await prismadb.carousel.findMany({
    where: {
      siteId: params.siteId,
    },
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
