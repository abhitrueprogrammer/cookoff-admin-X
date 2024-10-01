// Sidebar.tsx
"use client";
import cookoff from "@/assets/images/codechef_logo.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaHome, FaQuestion, FaUser } from "react-icons/fa";
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
            className="border-r pr-2 border-gray-300"
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
          className="mt-11 rounded-md p-5 text-left text-lg text-accent hover:bg-black"
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
          className="rounded-md bg-[#101010] p-5 text-left text-lg text-white hover:bg-black"
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
          className="rounded-md p-5 text-left text-lg text-white hover:bg-black"
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
