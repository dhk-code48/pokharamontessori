"use server";

import db from "@/lib/prismadb";
import { BillboardSchema } from "@/schemas";
import * as z from "zod";

export const createBillboard = async (values: z.infer<typeof BillboardSchema>) => {
  const validatedFields = BillboardSchema.safeParse(values);
  const siteId = process.env.NEXT_SITEID;

  if (!validatedFields.success || !siteId) {
    return { error: "Invalidate Data" };
  }

  const { label, description, imageUrl } = validatedFields.data;

  try {
    await db.billboard.create({
      data: {
        label,
        description,
        imageUrl,
        siteId,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Billboard Created Success" };
};
