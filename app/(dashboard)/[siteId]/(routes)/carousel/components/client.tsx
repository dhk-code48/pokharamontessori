"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, CarouselColumn } from "./columns";

interface CarouselClientProps {
  data: CarouselColumn[];
}

export const CarouselClient: React.FC<CarouselClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Carousel (${data.length})`} description="Manage Carousel for your site" />
        <Button onClick={() => router.push(`/${params.siteId}/carousel/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Carousel" />
      <Separator />
      <ApiList entityName="carousel" entityIdName="carouselid" />
    </>
  );
};
