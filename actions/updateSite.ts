"use server";

import db from "@/lib/prismadb";
import { SettingSchema } from "@/schemas";
import * as z from "zod";

export const updateSetting = async (values: z.infer<typeof SettingSchema>) => {
  const validatedFields = SettingSchema.safeParse(values);

  const siteId = process.env.NEXT_SITEID;

  if (!validatedFields.success || !siteId) {
    return { error: "Invalidate Data" };
  }

  const {
    name,
    address,
    seoBanner,
    email,
    facebookId,
    instagram,
    logoDark,
    logoLight,
    phoneNumber,
    youtube,
  } = validatedFields.data;

  try {
    await db.site.update({
      where: {
        id: siteId,
      },
      data: {
        name,
        address,
        email,
        facebookId,
        instagram,
        logoDark,
        logoLight,
        phoneNumber,
        youtube,
        seoBanner,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Setting Updated Success" };
};
