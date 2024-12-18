/* import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"; */

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreatePost } from "../actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const { isAuthenticated, getPermission } = getKindeServerSession();
  const permission = await getPermission("create:post");

  if (!(await isAuthenticated()) || permission?.isGranted !== true) {
    return redirect("/");
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard - only for admins </CardTitle>
        <CardDescription>
          This page should only be accesible for people/users who are
          authenticated and at the same time either have a admin or editor role
          in the kinde platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" action={CreatePost}>
          <div className="flex flex-col gap-2">
            <Label>Title</Label>
            <Input name="title" placeholder="Title" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Input name="description" placeholder="Description" />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DashboardPage;
