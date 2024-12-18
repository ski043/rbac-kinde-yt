/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import prisma from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

async function getPosts() {
  const posts = await prisma.post.findMany();
  return posts;
}

const BlogPage = async () => {
  const posts = await getPosts();
  const { isAuthenticated, getPermission } = getKindeServerSession();
  const permission = await getPermission("view:blog");

  if (!(await isAuthenticated()) || permission?.isGranted !== true) {
    return redirect("/");
  }

  const deletePermission = await getPermission("delete:post");
  return (
    <div className="grid grid-cols-3 gap-4">
      {posts.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <img
              className="w-full h-full object-cover rounded-lg"
              src="https://picsum.photos/200"
              alt="blog"
            />
          </CardContent>
          {deletePermission?.isGranted && (
            <CardFooter>
              <Button>Delete</Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
};

export default BlogPage;
