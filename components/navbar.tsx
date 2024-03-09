import { redirect } from "next/navigation";

import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import db from "@/lib/prismadb";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  const stores = await db.site.findMany();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          {/* <UserButton afterSignOutUrl="/" /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
