"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.siteId}`,
      label: "Overview",
      active: pathname === `/${params.siteId}`,
    },
    {
      href: `/${params.siteId}/carousel`,
      label: "Carousel",
      active: pathname === `/${params.siteId}/carousel`,
    },
    {
      href: `/${params.siteId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.siteId}/billboards`,
    },
    {
      href: `/${params.siteId}/categories`,
      label: "Categories",
      active: pathname === `/${params.siteId}/categories`,
    },
    {
      href: `/${params.siteId}/subcategories`,
      label: "SubCategories",
      active: pathname === `/${params.siteId}/subcategories`,
    },
    {
      href: `/${params.siteId}/authors`,
      label: "Authors",
      active: pathname === `/${params.siteId}/authors`,
    },
    {
      href: `/${params.siteId}/blogs`,
      label: "Blogs",
      active: pathname === `/${params.siteId}/blogs`,
    },
    {
      href: `/${params.siteId}/results`,
      label: "Results",
      active: pathname === `/${params.siteId}/results`,
    },
    {
      href: `/${params.siteId}/settings`,
      label: "Settings",
      active: pathname === `/${params.siteId}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-black dark:text-white" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
