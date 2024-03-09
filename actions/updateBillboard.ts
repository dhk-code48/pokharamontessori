"use server";

import db from "@/lib/prismadb";
import { BillboardSchema } from "@/schemas";
import * as z from "zod";

export const updateBillboard = async (
  values: z.infer<typeof BillboardSchema>,

  { billboardId }: { billboardId: string }
) => {
  const validatedFields = BillboardSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  const { label, description, imageUrl } = validatedFields.data;

  try {
    await db.billboard.update({
      where: {
        id: billboardId,
      },
      data: {
        label,
        description,
        imageUrl,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Billboard Updated Success" };
};
