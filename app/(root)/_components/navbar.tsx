import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import MainNav from "./main-nav";
import SchoolLogo from "./logo";
import db from "@/lib/prismadb";

const Navbar = async () => {
  const categories = await db.category.findMany();
  const site = await db.site.findFirst();

  return (
    <div>
      <div className="bg-background">
        <div className="hidden container text-gray-800 dark:text-white lg:flex justify-between items-center h-10">
          <div className="flex items-center gap-x-5">
            <Phone size={20} />
            {site?.phoneNumber}
          </div>
          <div className="flex flex-wrap gap-5">
            <div className="flex items-center gap-x-3">
              <Mail size={20} />
              {site?.email}
            </div>
            <div className="flex items-center gap-x-3">
              <MapPin size={20} />
              {site?.address}
            </div>
          </div>
        </div>
      </div>
      <div className="container h-auto flex flex-col justify-between items-center lg:flex-row lg:h-20">
        <SchoolLogo light={site?.logoLight} dark={site?.logoDark} />
        {categories && <MainNav data={categories} />}
      </div>
    </div>
  );
};

export default Navbar;
