import getBlog from "@/actions/getBlog";
import getBlogs from "@/actions/getBlogs";
import getCarousels from "@/actions/getCarousels";
import BlogCard from "@/components/blog-card";
import { LandingCarousel } from "@/components/landing-carousel";
import { Button } from "@/components/ui/button";
import getSite from "@/actions/getSite";
import BlogContent from "@/components/blog-content";
// import { Metadata } from "next";
import Link from "next/link";

// export async function generateMetadata(): Promise<Metadata> {
//   const site = await getSite();

//   return {
//     title: site?.name,
//     twitter: {
//       title: site?.name,
//       description: site?.name,
//       images: [
//         {
//           protocol: "https",
//           pathname: "/**",
//           hostname: "res.cloudinary.com",
//           url: site ? site.seoBanner ?? "" : "",
//           alt: site?.name,
//         },
//       ],
//     },
//     openGraph: {
//       siteName: site?.name,
//       type: "website",
//       description: site?.name,
//       countryName: "Nepal",
//       images: [
//         {
//           protocol: "https",
//           pathname: "/**",
//           hostname: "res.cloudinary.com",
//           url: site ? site.seoBanner ?? "" : "",
//           alt: site?.name,
//         },
//       ],
//     },
//   };
// }

export default async function Home() {
  const carousel = await getCarousels();
  const site = await getSite();
  const featuredBlogs = await getBlogs({ isFeatured: true });
  const messagefromprinciple = await getBlog(process.env.MESSAGE_FROM_PRINCIPLE || "");
  return (
    <div className="lg:container space-y-10 py-5 min-h-[calc(100vh-198px)]">
      {carousel && <LandingCarousel carousels={carousel} />}
      <br />

      <div className="container block gap-x-10 lg:grid grid-cols-2">
        <div className="dark:bg-gray-900 bg-gray-200 p-5 rounded-lg">
          <h1 className="text-2xl text-primary font-bold">Welcome To {site?.name}</h1>
          <p className="font-medium mb-10">A Message from Principal</p>
          {messagefromprinciple && (
            <div className="relative">
              <div className="h-[300px] overflow-hidden">
                <BlogContent content={messagefromprinciple.content} />
              </div>
              <div className="absolute dark:bg-transparent dark:text-white bg-gray-200 bottom-0 right-0 px-2">
                ...
              </div>
            </div>
          )}
          <Link href={"/blog/" + messagefromprinciple}>
            <Button className="mt-10">Read more</Button>
          </Link>
        </div>
        <div className="mt-10 lg:mt-0">
          <h1 className="text-lg font-bold">Featured Posts</h1>
          {featuredBlogs &&
            featuredBlogs.map((blog, index) => <BlogCard key={blog.title} blog={blog} />)}
        </div>
      </div>
    </div>
  );
}
