import { format } from "date-fns";

import db from "@/lib/prismadb";

import { SubCategoryColumn } from "./_components/columns";
import { SubCategoriesClient } from "./_components/client";

const SubCategoriesPage = async () => {
  const categories = await db.subCategory.findMany({
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
