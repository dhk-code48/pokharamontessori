import AuthorProfile from "@/components/author-profile";
import { Calendar } from "lucide-react";
import moment from "moment";
import React, { FC } from "react";
import BlogCard from "@/components/blog-card";
import { Metadata } from "next";
import BlogContent from "@/components/blog-content";
import { siteMetadata } from "@/lib/siteMetadata";
import db from "@/lib/prismadb";

interface BlogPageProps {
  params: {
    blogId: string;
    categoryId: string;
  };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const blog = await db.blog.findUnique({
    where: { id: params.blogId },
    include: { author: true },
  });
  const site = await db.site.findFirst();

  if (!blog) {
    return {
      ...siteMetadata,
    };
  }
  if (!site) {
    return {
      title: "School Not Found",
    };
  }

  return {
    title: blog.title + " || " + site.name,
    description: blog.headline,
    openGraph: {
      title: blog.title + " || " + site.name,
      description: blog.headline,
      url: siteMetadata.siteUrl + "/blog/" + blog.id,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: new Date(blog.createdAt).toISOString(),
      modifiedTime: new Date(blog.updatedAt).toISOString(),
      authors: blog.author ? [blog.author.name] : [siteMetadata.author],
      images: [
        {
          url: blog?.imageUrl,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      title: blog.title,
      description: blog.headline,
      images: [
        {
          url: blog?.imageUrl,
          alt: blog.title,
        },
      ],
    },
  };
}

const BlogPage: FC<BlogPageProps> = async ({ params }) => {
  const blog = await db.blog.findUnique({
    where: { id: params.blogId },
    include: { author: true },
  });
  if (!blog) {
    return;
  }
  const relatedBlogs = await db.blog.findMany({
    where: { categoryId: blog.categoryId, isArchived: false },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: blog.title,
    description: blog.headline,
    image: blog.imageUrl,
    datePublished: new Date(blog.createdAt).toISOString(),
    dateModified: new Date(blog.updatedAt || blog.createdAt).toISOString(),
    author: [
      {
        "@type": "Person",
        name: blog.author ? [blog.author] : siteMetadata.author,
        url: siteMetadata.facebook,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <div className="max-w-screen-md mx-auto mt-10 px-10 lg:px-0 prose">
          <h1 className="text-3xl font-bold mb-5"> {blog.title}</h1>
          {/* <Markdown>{blog.headline}</Markdown> */}
          <br />
          <div className="flex justify-between lg:justify-start lg:gap-x-10 mb-10 items-center">
            <AuthorProfile author={blog.author} />
            <div className="flex capitalize items-center gap-x-2">
              <Calendar size={24} />
              {moment(blog.createdAt).fromNow()}
            </div>
          </div>
          <BlogContent content={blog.content} />

          <hr />
          <div className="mt-10 space-y-5">
            <h3 className="text-xl font-bold tracing-wide">Related Post</h3>
            <div className="flex lg:flex-row flex-col gap-x-5 gap-y-10">
              {relatedBlogs &&
                relatedBlogs
                  .slice(0, 3)
                  .map((blog) => (
                    <BlogCard key={blog.authorId} blog={blog} className="w-[300px]" />
                  ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPage;
