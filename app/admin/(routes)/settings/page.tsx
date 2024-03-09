import db from "@/lib/prismadb";

import { redirect } from "next/navigation";
import React from "react";
import { SettingsForm } from "./_components/settings-form";
import { auth } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const store = await db.site.findFirst();

  if (!store) {
    redirect("/");
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
