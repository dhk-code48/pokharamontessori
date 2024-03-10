import getBillboard from "@/actions/getBillboard";
import getBlogs from "@/actions/getBlogs";
import getCategory from "@/actions/getCategory";
import getSubCategories from "@/actions/getSubcategories";
import BlogCard from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { FC } from "react";
// import Filter from "../../../../components/filter";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import Head from "next/head";
import getSite from "@/actions/getSite";
import { siteMetadata } from "@/lib/siteMetadata";
import Filter from "@/components/filter";

interface CategoryPageProp {
  params: { categoryId: string };
  searchParams: {
    subcategoryId: string;
  };
}

export async function generateMetadata(
  { params }: CategoryPageProp,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const category = await getCategory(params.categoryId);
  const site = await getSite();
  const billboard = await getBillboard(params.categoryId);

  if (!category || !site || !billboard) {
    return {
      ...siteMetadata,
    };
  }

  return {
    title: category.name + " || " + site.name,
    description: billboard.description,
    openGraph: {
      title: category.name + " || " + site.name,
      description: billboard.description,
      url: siteMetadata.siteUrl + "/category/" + category.id,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: new Date(category.createdAt).toISOString(),
      modifiedTime: new Date(category.updatedAt).toISOString(),
      authors: [siteMetadata.author],
      images: [
        {
          url: billboard.imageUrl,
          alt: billboard.label,
        },
      ],
    },
    twitter: {
      title: category.name,
      description: billboard.description,
      images: [
        {
          url: billboard.imageUrl,
          alt: billboard.label,
        },
      ],
    },
  };
}

const CategoryPage: FC<CategoryPageProp> = async ({ params, searchParams }) => {
  const blogs = await getBlogs({
    categoryId: params.categoryId,
    isArchived: false,
    subcategoryId: searchParams.subcategoryId,
  });

  const category = await getCategory(params.categoryId);
  const site = await getSite();

  if (!category || !site) {
    return;
  }

  return (
    <div>
      <div className="w-full relative">
        <Image
          className="h-80 lg:h-72 object-cover"
          src={category.billboard.imageUrl}
          alt={category.billboard.label}
          width={1920}
          height={1080}
        />
        <div className="w-full space-y-5 h-full absolute top-0 left-0 text-center bg-black/70 bg-blend-overlay flex flex-col justify-center items-center px-5 lg:px-10 text-white">
          <h1 className="text-3xl tracking-wide font-bold">{category.billboard.label}</h1>
          <p className="lg:w-[50%] font-medium text-gray-100">{category.billboard.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap lg:gap-x-16 container mt-10">
        <div>
          <Filter valueKey="subcategoryId" name="Category" data={category.subCategory} />
        </div>

        <div className="flex flex-wrap lg:gap-x-10 gap-y-5">
          {blogs ? (
            blogs.map((blog) => {
              return <BlogCard blog={blog} key={blog.id} />;
            })
          ) : (
            <p className="text-center w-full italic">No {category.name} Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
