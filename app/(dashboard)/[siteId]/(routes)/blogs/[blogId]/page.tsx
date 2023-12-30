import prismadb from "@/lib/prismadb";

import { BlogForm } from "./components/blog-form";

const BlogPage = async ({ params }: { params: { blogId: string; siteId: string } }) => {
  const blog = await prismadb.blog.findUnique({
    where: {
      id: params.blogId,
    },
    include: {
      author: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      siteId: params.siteId,
    },
  });

  const authors = await prismadb.author.findMany({
    where: {
      siteId: params.siteId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BlogForm categories={categories} initialData={blog} authors={authors} />
      </div>
    </div>
  );
};

export default BlogPage;
