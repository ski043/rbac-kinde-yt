/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import prisma from "../utils/db";

async function getPosts() {
  const posts = await prisma.post.findMany();
  return posts;
}

const BlogPage = async () => {
  const posts = await getPosts();
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
        </Card>
      ))}
    </div>
  );
};

export default BlogPage;
