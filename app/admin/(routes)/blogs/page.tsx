import { format } from "date-fns";

import db from "@/lib/prismadb";

import { BlogsClient } from "./_components/client";
import { BlogColumn } from "./_components/columns";

const BlogsPage = async () => {
  const blogs = await db.blog.findMany({
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
