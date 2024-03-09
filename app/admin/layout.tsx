import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";
import db from "@/lib/prismadb";
import { auth } from "@/auth";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const store = await db.site.findFirst({
    where: {
      id: params.storeId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
