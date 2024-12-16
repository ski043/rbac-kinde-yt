"use server";

import { redirect } from "next/navigation";
import prisma from "./utils/db";

export async function CreatePost(formData: FormData) {
  await prisma.post.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    },
  });

  return redirect("/blog");
}
