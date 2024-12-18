"use server";

import { redirect } from "next/navigation";
import prisma from "./utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function CreatePost(formData: FormData) {
  const { isAuthenticated, getPermission } = getKindeServerSession();
  const permission = await getPermission("create:post");

  if (!(await isAuthenticated()) || permission?.isGranted !== true) {
    return redirect("/");
  }

  await prisma.post.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    },
  });

  return redirect("/blog");
}
