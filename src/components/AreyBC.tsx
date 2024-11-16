"use client";
import Providers from "@/lib/Providers";
import { usePathname } from "next/navigation";
import React from "react";

const AreyBC = ({ children }: { children: React.ReactNode }) => {
  // const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="">
      <Providers>
        <div
          className={`ml- flex flex-col ${pathname !== "/" ? "ml-44 p-12" : ""} bg-black`}
        >
          {children}
        </div>
      </Providers>
    </div>
  );
};

export default AreyBC;
