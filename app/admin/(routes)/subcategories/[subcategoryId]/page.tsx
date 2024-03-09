import db from "@/lib/prismadb";

import { SubCategoryForm } from "./_components/subcategory-form";

const CategoryPage = async ({ params }: { params: { subcategoryId: string } }) => {
  const subcategory = await db.subCategory.findUnique({
    where: {
      id: params.subcategoryId,
    },
  });

  const categories = await db.category.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubCategoryForm categories={categories} initialData={subcategory} />
      </div>
    </div>
  );
};

export default CategoryPage;
