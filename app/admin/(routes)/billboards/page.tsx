import { format } from "date-fns";

import db from "@/lib/prismadb";

import { BillboardColumn } from "./_components/columns";
import { BillboardClient } from "./_components/client";

const BillboardsPage = async () => {
  const billboards = await db.billboard.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    description: item.description,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
