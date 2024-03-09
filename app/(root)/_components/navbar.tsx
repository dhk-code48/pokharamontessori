import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";
import MainNav from "./main-nav";
import getCategories from "@/actions/getCategories";
import getSite from "@/actions/getSite";
import SchoolLogo from "./logo";

const Navbar = async () => {
  const categories = await getCategories();
  const site = await getSite();

  return (
    <div>
      <div className="bg-background">
        <div className="hidden container text-white lg:flex justify-between items-center h-10">
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
