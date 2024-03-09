import { redirect } from "next/navigation";

import db from "@/lib/prismadb";
import { auth } from "@/auth";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

export default async function SetupLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <>
      <Navbar />
      {children}
      <br />
      <Footer />
    </>
  );
}
