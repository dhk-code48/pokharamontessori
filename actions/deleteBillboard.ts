"use server";

import db from "@/lib/prismadb";

export const deleteBillboard = async (billboardId: string) => {
  try {
    await db.billboard.delete({
      where: {
        id: billboardId,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Billboard Deleated Success" };
};
