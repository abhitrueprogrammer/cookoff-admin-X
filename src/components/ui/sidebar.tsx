// Sidebar.tsx
"use client";
import cookoff from "@/assets/images/codechef_logo.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaHome, FaQuestion, FaUser, FaArrowAltCircleUp } from "react-icons/fa";


// import { Router } from "";
export default function Sidebar() {
  // const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav
      className={`${pathname === "/" ? "hidden" : "flex"} fixed z-10 float-left flex h-screen w-44 flex-col border-r border-black bg-[#101010] transition-all duration-300`}
    >
      (
      <>
        <div className="s-sling text- ml-3 flex items-center gap-2 text-lg text-white">
          <Image
            className="border-r border-gray-300 pr-2"
            src={cookoff as HTMLImageElement}
            alt="cookoff text"
            width={40}
            height={40}
          />
          Cookoff
        </div>
        <button
          onClick={() => {
            router.push("/dashboard");
          }}
          className={`m-2 mx-3 mt-11 rounded-md border border-transparent p-3 text-left text-lg text-white hover:border hover:border-white ${pathname == "/dashboard" ? "border bg-accent hover:bg-[#f25c2d]" : "hover:bg-black"} `}
        >
          <div className="flex items-center gap-3">
            <FaHome />
            Dashboard
          </div>
        </button>
        <button
          onClick={() => {
            router.push("/question");
          }}
          className={`m-2 mx-3 rounded-md border border-transparent bg-[#101010] p-3 text-left text-lg text-white hover:border hover:border-white ${pathname.startsWith("/question") ? "border bg-accent hover:bg-[#f25c2d]" : "hover:bg-black"} `}
        >
          <div className="flex items-center gap-3">
            <FaQuestion />
            Questions
          </div>
        </button>
        <button
          onClick={() => {
            router.push("/users");
          }}
          //p-5 originally no m-2
          className={`m-2 mx-3 rounded-md border border-transparent p-3 text-left text-lg text-white hover:border hover:border-white ${pathname == "/users" ? "border bg-accent hover:bg-[#f25c2d]" : "hover:bg-black"}`}
        >
          <div className="flex items-center gap-3">
            <FaUser />
            Users
          </div>{" "}
        </button>


      </>
      )
    </nav>
  );
}