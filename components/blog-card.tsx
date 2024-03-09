"use client";
import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "./ui/button";

import Link from "next/link";
import { cn } from "@/lib/utils";
import moment from "moment";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { Blog } from "@prisma/client";

const BlogCard: FC<{ blog: Blog; className?: string }> = ({ blog, className }) => {
  const navigate = useRouter();

  return (
    <Card
      className={cn("w-full lg:w-[350px] mb-2", className)}
      onClick={() => navigate.push("/blog/" + blog.id)}
    >
      <CardHeader>
        <CardTitle className="text-primary">{blog.title}</CardTitle>
        <CardDescription className="flex gap-x-3 items-center">
          <Calendar size={20} />
          {moment(blog.createdAt).fromNow()}
        </CardDescription>
      </CardHeader>
      <CardContent>{blog.headline}</CardContent>
      <CardFooter className="flex justify-end">
        <Link href={"/blog/" + blog.id} className={buttonVariants()}>
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
