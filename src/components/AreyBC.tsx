"use client";
import Providers from "@/lib/Providers";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const AreyBC = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <Providers>
        <div className="flex flex-col bg-black">
          {pathname !== "/" && (
            <div className="my-4 flex flex-row gap-4">
              <Button
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                Home
              </Button>
              <Button
                onClick={() => {
                  router.push("/users");
                }}
              >
                Users
              </Button>
              <Button
                onClick={() => {
                  router.push("/question");
                }}
              >
                Questions
              </Button>
            </div>
          )}
          {children}
        </div>
      </Providers>
    </div>
  );
};

export default AreyBC;
