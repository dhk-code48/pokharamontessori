import { usePathname } from "next/navigation";
import Link from "next/link";

import { CgWebsite } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";
import Image from "next/image";
import { Category } from "@prisma/client";

import SchoolLogo from "./logo";

import { Facebook, Instagram } from "lucide-react";
import db from "@/lib/prismadb";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

function FooterLink({ url, text }: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`hover:dark:text-violet-400 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function CategoryLink(category: Category) {
  return (
    <li className="flex justify-center">
      <Link href={`/category/${category.id}`} className="hover:dark:text-violet-400">
        {category.name}
      </Link>
    </li>
  );
}

function RenderSocialIcon({ social, link }: { social: string | undefined; link: string }) {
  return (
    <Link href={link}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center border hover:bg-white hover:text-black">
        {social === "WEBSITE" ? (
          <CgWebsite />
        ) : social === "TWITTER" ? (
          <AiFillTwitterCircle />
        ) : social === "YOUTUBE" ? (
          <AiFillYoutube />
        ) : social === "DISCORD" ? (
          <FaDiscord />
        ) : social === "FACEBOOK" ? (
          <Facebook />
        ) : social === "INSTAGRAM" ? (
          <Instagram />
        ) : (
          <></>
        )}
      </div>
    </Link>
  );
}

export default async function Footer() {
  const categories = await db.category.findMany();

  const site = await db.site.findFirst();
  return (
    <footer className="py-6 dark:bg-black dark:text-gray-50 border-t">
      <div className="container px-0 lg:px-6 mx-auto  divide-y divide-gray-400 divide-opacity-50">
        <div className="flex py-3 items-center justify-center flex-col gap-y-5 lg:grid grid-cols-3">
          <div className="pb-6 md:pb-0">
            <SchoolLogo dark={site?.logoDark} light={site?.logoLight} />
          </div>

          <div className="text-center">
            <p className="pb-1 text-lg font-medium">Links</p>
            <ul className="text-center">
              {categories &&
                categories.map((link: Category) => <CategoryLink key={link.id} {...link} />)}
            </ul>
          </div>

          <div className="text-center md:text-left">
            {site && site.facebookId && (
              <div
                className="fb-page"
                data-href={`https://www.facebook.com/${site.facebookId}`}
                data-tabs="timeline"
                data-width=""
                data-height="200px"
                data-small-header="true"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
              >
                <blockquote
                  cite={`https://www.facebook.com/${site.facebookId}`}
                  className="fb-xfbml-parse-ignore"
                >
                  <a href={`https://www.facebook.com/${site.facebookId}`}>{site.name}</a>
                </blockquote>
              </div>
            )}
          </div>
        </div>
        <div className="flex py-3 flex-wrap md:gap-x-3 gap-x-2 justify-center text-nowrap lg:gap-x-5 ">
          {site?.facebookId && (
            <RenderSocialIcon
              link={"https://www.facebook.com/" + site.facebookId}
              social="FACEBOOK"
            />
          )}
          {site?.youtube && <RenderSocialIcon link={site.youtube} social="YOUTUBER" />}
          {site?.instagram && <RenderSocialIcon link={site.instagram} social="INSTAGRAM" />}
        </div>
        <div className="flex flex-wrap justify-center gap-x-1 text-nowrap pt-3">
          ©{new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </footer>
  );
}
