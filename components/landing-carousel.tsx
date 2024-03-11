"use client";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Carousel as CarouselProps } from "@prisma/client";

export function LandingCarousel({ carousels }: { carousels: CarouselProps[] }) {
  return (
    <Carousel className="w-[100%] rounded-sm overflow-hidden">
      <CarouselContent className="h-[50%]">
        {carousels.map((_, index) => (
          <CarouselItem key={index} className="relative">
            <Image src={_.imageUrl} alt={_.label} width={1920} height={1080} />
            <div className="absolute bottom-0 text-white font-bold text-sm  bg-blend-overlay left-0 px-6 py-1 w-full h-full flex items-end justify-start lg:text-lg lg:px-28 lg:py-24">
              <h1>{_.label}</h1>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
