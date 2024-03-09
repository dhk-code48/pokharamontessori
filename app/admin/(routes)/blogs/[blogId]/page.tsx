import db from "@/lib/prismadb";

import { BlogForm } from "./_components/blog-form";

const BlogPage = async ({ params }: { params: { blogId: string } }) => {
  const blog = await db.blog.findUnique({
    where: {
      id: params.blogId,
    },
    include: {
      author: true,
    },
  });

  const categories = await db.category.findMany();

  const subCategories = await db.subCategory.findMany();

  const authors = await db.author.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BlogForm
          categories={categories}
          initialData={blog}
          authors={authors}
          initialSubCategories={subCategories}
        />
      </div>
    </div>
  );
};

export default BlogPage;
