"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/admin`,
      label: "Overview",
      active: pathname === `/admin`,
    },
    {
      href: `/admin/carousel`,
      label: "Carousel",
      active: pathname === `/admin/carousel`,
    },
    {
      href: `/admin/billboards`,
      label: "Billboards",
      active: pathname === `/admin/billboards`,
    },
    {
      href: `/admin/categories`,
      label: "Categories",
      active: pathname === `/admin/categories`,
    },
    {
      href: `/admin/subcategories`,
      label: "SubCategories",
      active: pathname === `/admin/subcategories`,
    },
    {
      href: `/admin/authors`,
      label: "Authors",
      active: pathname === `/admin/authors`,
    },
    {
      href: `/admin/blogs`,
      label: "Blogs",
      active: pathname === `/admin/blogs`,
    },
    {
      href: `/admin/settings`,
      label: "Settings",
      active: pathname === `/admin/settings`,
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
