/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function Navbar() {
  const { getUser, getRoles } = getKindeServerSession();
  const user = await getUser();
  const roles = await getRoles();
  return (
    <section className="py-8">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <div className="flex items-center text-2xl font-bold">
              RBAC<span className="text-blue-500">Marshal</span>
            </div>
            <div className="flex items-center">
              <Link
                className={cn(
                  "text-muted-foreground",

                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="/"
              >
                Home
              </Link>

              <Link
                className={cn(
                  "text-muted-foreground",

                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="/blog"
              >
                Blog
              </Link>
              <Link
                className={cn(
                  "text-muted-foreground",

                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="/dashboard"
              >
                Dashboard
              </Link>
            </div>
          </div>
          <div className="flex gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <p>
                  Welcome, {user.given_name} ({roles?.[0].name})
                </p>
                <LogoutLink>
                  <Button variant={"outline"}>Log out</Button>
                </LogoutLink>
              </div>
            ) : (
              <>
                <LoginLink>
                  <Button variant={"outline"}>Log in</Button>
                </LoginLink>
                <RegisterLink>
                  <Button>Sign up</Button>
                </RegisterLink>
              </>
            )}
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="https://www.shadcnblocks.com/images/block/block-1.svg"
                className="w-8"
                alt="logo"
              />
              <span className="text-xl font-bold">Shadcn Blocks</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
