import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { SubCategoryColumn } from "./components/columns";
import { SubCategoriesClient } from "./components/client";

const SubCategoriesPage = async ({ params }: { params: { siteId: string } }) => {
  const categories = await prismadb.subCategory.findMany({
    where: {
      siteId: params.siteId,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSubCategories: SubCategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    categoryLabel: item.category.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubCategoriesClient data={formattedSubCategories} />
      </div>
    </div>
  );
};

export default SubCategoriesPage;
