import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { BlogsClient } from "./components/client";
import { BlogColumn } from "./components/columns";

const BlogsPage = async ({ params }: { params: { siteId: string } }) => {
  const blogs = await prismadb.blog.findMany({
    where: {
      siteId: params.siteId,
    },
    include: {
      category: true,
      author: true,
      subCategory: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBlogs: BlogColumn[] = blogs.map((item) => ({
    id: item.id,
    title: item.title,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    category: item.category.name,
    author: item.author.name,
    subcategory: item.subCategory.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BlogsClient data={formattedBlogs} />
      </div>
    </div>
  );
};

export default BlogsPage;
