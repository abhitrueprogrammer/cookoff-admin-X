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
        <div className={` flex ml- flex-col ${pathname !== "/"? "p-12 ml-44":""} bg-black`}>

          {children}
        </div>
      </Providers>
    </div>
  );
};

export default AreyBC;
